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
    const [isRace, setIsRace] = useState(true)
    const [isPace, setIsPace] = useState(false)
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
            const distanceArray = Object.entries(distanceTable)
            const closestTime = distanceArray.reduce((prev, curr) => {
                return (Math.abs(curr[1] - time) < Math.abs(prev[1] - time) ? curr : prev)
            })
            const closestVdot = parseInt(closestTime[0])
            const percentDiff = closestTime[1] / time
            const preciseVdot = closestVdot * percentDiff
            console.log(closestVdot, percentDiff, preciseVdot)
            setVDOT({ vdot: closestVdot.toString(), precise: preciseVdot, percentOff: percentDiff })
            if (closestVdot === 85 && percentDiff > 1 || closestVdot === 30 && percentDiff < 1) {
                setOutOfRange(true)
            }
            else {
                setOutOfRange(false)
            }
        }

    }, [value, isRace, isPace, time])

    useEffect(() => {
        if (vdot.precise === 0 || vdot.vdot === '' || vdot.precise < 10 || vdot.precise > 100) {
            setOutput([''])
            return
        }
        console.log(vdot)
        if (isRace) {
            const timesList = vdotTable.TIMES
            const vdotArray = Object.entries(timesList)
            const outputs = vdotArray.map((d) => {
                const distance = DISTANCES.find(dist => dist.value === d[0])
                const distanceLabel = distance?.label || distance?.value
                const currentDistance = distance?.distance || 1
                console.log(currentDistance)
                const time = d[1][vdot.vdot as keyof typeof d[1]] / (isPace ?  currentDistance / 1609.34 : 1)
                return `${distanceLabel}: ${outTime(time / vdot.percentOff)}`
            })
            setOutput(outputs)
        }
        else {
            const vdotObject = vdotTable.PACES[vdot.vdot as keyof typeof vdotTable.PACES]
            const vdotArray = Object.entries(vdotObject)
            const labelList = ["Easy", "Marathon", "Threshold", "Interval", "Repitition"]
            console.log(vdotArray)
            const outputs = vdotArray.map((d, i) => {
                const time = d[1][i < 3 ? 'mile' : '400m']
                console.log(time, d)
                if (i > 2) return `${labelList[i]}: ${outTime(time / vdot.percentOff)} (${outTime(time / vdot.percentOff * 4.02335)})`
                if (i != 0) return `${labelList[i]}: ${outTime(time / vdot.percentOff)}`
                return `${labelList[i]}: ${outTime(time / vdot.percentOff - 13)} - ${outTime(time / vdot.percentOff + 27)}`
            })
            setOutput(outputs)
        }
    }, [vdot, isRace, isPace])


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
                    <div className={`switch ${isRace ? isPace ? 'left' : 'right' : 'left'}`} onClick={() => { if (isRace) setIsPace(!isPace) }}>
                        {isRace ? isPace ? 'Pace' : 'Time' : 'Pace'}
                        <span className='switch-item'></span>
                    </div>

                </div>
                <div className='output'>
                    <div className="output-text vdot-output">
                        {output.join('\n')}
                    </div>

                    {vdot.precise !== 0 && vdot.precise < 100 && vdot.precise > 10 ?
                        <div className="output-text vdot-text">
                            Vdot: {vdot.precise.toFixed(2)}
                        </div>
                        : null}
                </div>
            </div>
        </PageWrapper>
    )
}
