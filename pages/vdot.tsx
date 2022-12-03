import { useEffect, useState } from 'react'
import TimeInput from '../Components/TimeInput'
import PageWrapper from '../Components/PageWrapper'
import Dropdown from '../Components/Dropdown'
import { outTime } from '../scripts/scripts'
import { DISTANCES, vdotTable } from '../scripts/vdot-table'


export default function VDOT() {
    const [value, setValue] = useState('')
    const [vdot, setVDOT] = useState({ vdot: '', precise: 0, percentOff: 0 })
    const [time, setTime] = useState(0)
    const [output, setOutput] = useState([''])
    const [isRace, setIsRace] = useState(false)
    const [outOfRange, setOutOfRange] = useState(false)


    useEffect(() => {
        if (value === '' || time === 0) {
            setOutput([''])
            setVDOT({ vdot: '', precise: 0, percentOff: 0 })
            setOutOfRange(false)
            return
        }
        const distance = DISTANCES.find(d => d.value === value)
        if (distance) {
            const distanceTable = vdotTable.TIMES[distance.value as keyof typeof vdotTable.TIMES]
            const distanceMap = new Map(Object.entries(distanceTable));
            const distanceArray = Array.from(distanceMap)
            const closestTime = distanceArray.reduce((prev, curr) => {
                return (Math.abs(curr[1] - time) < Math.abs(prev[1] - time) ? curr : prev)
            })
            const closestVdot = parseInt(closestTime[0])
            const percentDiff = closestTime[1] / time
            const preciseVdot =  closestVdot * percentDiff
            console.log(closestVdot, percentDiff, preciseVdot)
            setVDOT({ vdot: closestVdot.toString(), precise: preciseVdot, percentOff: percentDiff })
            if (closestVdot === 85 && percentDiff > 1 || closestVdot === 30 && percentDiff < 1) {
                setOutOfRange(true)
            }
            else {
                setOutOfRange(false)
            }
        }

    }, [value, isRace, time])

    useEffect(() => {
        if (vdot.precise === 0 || vdot.vdot === '' || vdot.precise < 10 || vdot.precise > 100) {
            setOutput([''])
            return
        }
        console.log(vdot)
        const timesList = vdotTable.TIMES
        const vdotMap = new Map(Object.entries(timesList));
        const vdotArray = Array.from(vdotMap)
        const outputs = vdotArray.map((d) => {
            const distance = DISTANCES.find(dist => dist.value === d[0])
            const distanceLabel = distance?.label || distance?.value
            const time = d[1][vdot.vdot as keyof typeof d[1]]
            return `${distanceLabel}: ${outTime(time / vdot.percentOff)}`
        })
        setOutput(outputs)
    }, [vdot])



    return (
        <PageWrapper page="vdot" className={'vdot-page'}>
            <div className="title-box">
                <h1 className='title'>Calculate Equivalent Times</h1>
            </div>
            <div className="content-box">
                <div className="input-box">
                    <Dropdown items={DISTANCES} placeholder='Distance' setValue={setValue} className="input-box-content" />
                    <TimeInput value={time} onChange={setTime} className="input-box-content" />
                    {outOfRange ?
                        <div className="error">
                            Time is out of range
                        </div>
                        :
                        <></>
                    }
                    <div className={`switch ${isRace ? 'left' : 'right'}`} onClick={() => setIsRace(!isRace)}>
                        {isRace ? 'Race Times' : 'Training Times'}
                        <span className='switch-item'></span>
                    </div>

                </div>
                <div className='output'>
                    <div className="output-text vdot-output">
                        {output.join('\n')}
                    </div>

                    {vdot.precise !== 0  && vdot.precise < 100 && vdot.precise > 10?
                        <div className="output-text vdot-text">
                            Vdot: {vdot.precise.toFixed(2)}
                        </div>
                        : null}
                </div>
            </div>
        </PageWrapper>
    )
}
