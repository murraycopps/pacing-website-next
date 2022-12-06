import { useEffect, useState } from 'react'
import TimeInput from '../Components/TimeInput'
import PageWrapper from '../Components/PageWrapper'
import Dropdown from '../Components/Dropdown'
import { outTime } from '../scripts/scripts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'


export default function Home() {
    const [distance, setDistance] = useState(1)
    const [time, setTime] = useState(0)
    const [output, setOutput] = useState([''])
    const [isTime, setIsTime] = useState(false)
    const [disType, setDisType] = useState(1609.34)
    const [speed, setSpeed] = useState(0)

    const inputDistances = [
        { label: 'Mi', value: 1609.34 },
        { label: 'Km', value: 1000 },
        { label: 'M', value: 1 },
        { label: 'Mar', value: 42195 }
    ]

    const inputSpeeds = [
        { label: 'Mph', value: 1609.34 },
        { label: 'Kph', value: 1000 },
        { label: 'M/s', value: 1 },
    ]

    const timeToSpeed = (distance: number, time: number, newDistance: number) => {
        return 3600 * distance / time / newDistance
    }

    const speedToTime = (speed: number, distance: number) => {
        if (distance != 1) return outTime(distance / speed)
        else return distance / speed
    }



    useEffect(() => {
        if (!isTime) {
            const distanceInMeters = distance * disType
            if (distance <= 0 || time <= 0) return
            const outputLables = ['Time', 'Seconds', 'Mph', 'Kph', 'M/S', 'Mins/Mile', 'Mins/Km']
            const outputs = [outTime(time), time, Math.round(timeToSpeed(distanceInMeters, time, 1609.34) * 10) / 10, Math.round(timeToSpeed(distanceInMeters, time, 1000) * 10) / 10, Math.round(timeToSpeed(distanceInMeters, time, 1) / 3600 * 100) / 100, outTime(time / distanceInMeters * 1609.34), outTime(time / distanceInMeters * 1000)]
            setOutput(outputLables.map((o, i) => outputLables[i] + ': ' + outputs[i]))
        }
        else {
            if (distance <= 0 || speed <= 0) return
            if (disType === 1) {
                const outputOptions = [
                    { label: 'Mile Time', value: 1609.34 },
                    { label: 'Km Time', value: 1000 },
                    { label: 'Meter Time', value: 1 },
                    { label: 'Marathon Time', value: 42195 },
                    { label: 'Mph', value: 1609.34 },
                    { label: 'Kph', value: 1000 },
                    { label: 'M/S', value: 1 },
                ]
                const outputs = outputOptions.map((o, i) => {
                    if (i < 4) {
                        const time = speedToTime(speed, o.value)
                        if (typeof time === 'string') return o.label + ': ' + time
                        else return o.label + ': ' + time
                    }
                    if (o.value === disType) return ''
                    if (o.value !== 1) return o.label + ': ' + Math.round(speed * disType / o.value * 3600 * 10) / 10
                    return o.label + ': ' + Math.round(speed * disType / o.value / 3600 * 10) / 10
                })
                setOutput(outputs.filter(o => o))
            }
            else {
                const outputOptions = [
                    { label: 'Mile Time', value: 1609.34 },
                    { label: 'Km Time', value: 1000 },
                    { label: 'M Time', value: 1 },
                    { label: 'Marathon Time', value: 42195 },
                    { label: 'Mph', value: 1609.34 },
                    { label: 'Kph', value: 1000 },
                    { label: 'M/S', value: 1 },
                ]
                const outputs = outputOptions.map((o, i) => {
                    if (i < 4) {
                        const time = speedToTime(speed * disType / 3600, o.value)
                        if (typeof time === 'string') return o.label + ': ' + time
                        else return o.label + ': ' + outTime(time)
                    }
                    if (o.value === disType) return ''
                    if (o.value !== 1) return o.label + ': ' + Math.round(speed * disType / o.value * 10) / 10
                    return o.label + ': ' + Math.round(speed * disType / o.value / 3600 * 10) / 10
                })
                setOutput(outputs.filter(o => o))
            }
        }

    }, [disType, distance, time, speed, isTime])

    return (
        <PageWrapper page="convert" className={'pacing-page'}>
            <div className="title-box">
                <h1 className='title'>Convert Time and Speed</h1>
            </div>
            <div className="content-box">
                <div className="input-box">

                    {isTime ?
                        <>
                            <input type="number" onChange={(e) => { if (e.target.value != '') setSpeed(parseFloat(e.target.value)); else setSpeed(0) }} className="input-box-content input" />
                            <Dropdown items={inputSpeeds} value={disType} setValue={(e) => setDisType(e)} className="input-box-content" />
                        </>
                        :
                        <>
                            <TimeInput value={time} onChange={setTime} className="input-box-content" />
                            <input type="number" onChange={(e) => { if (e.target.value != '') setDistance(parseFloat(e.target.value)); else setDistance(0); }} className="input-box-content input" />
                            <Dropdown items={inputDistances} value={disType} setValue={setDisType} className="input-box-content" />
                        </>
                    }

                    <div className={`switch ${isTime ? 'left' : 'right'}`} onClick={() => setIsTime(!isTime)}>
                        {isTime ? 'Time' : 'Distance'}
                        <span className='switch-item'></span>
                    </div>

                </div>
                <div className='output'>
                    <div className="output-text">
                        {output.join('\n')}
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
