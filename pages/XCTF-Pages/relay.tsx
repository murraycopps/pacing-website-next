import { useEffect, useState } from 'react'
import TimeInput from '../../Components/TimeInput'
import PageWrapper from '../../Components/PageWrapper'
import { outTime } from '../../scripts/scripts'


export default function Home() {
    const [times, setTimes] = useState([0, 0, 0, 0])
    const [output, setOutput] = useState('')
    const [numTimes, setNumTimes] = useState(4)

    useEffect(() => {
        setOutput(outTime(times.reduce((a, b) => a + b, 0)))
    }, [times])

    const insertAtIndex = (value: any, index: number) => {
        if (value === '') value = 0
        const newArray = [...times];
        newArray[index] = parseFloat(value);
        setTimes(newArray);
    }

    return (
        <PageWrapper page="relay" className={'pacing-page'}>
            <div className="title-box">
                <h1 className='title'>Add Times for Relay</h1>
            </div>
            <div className="content-box">
                <div className="input-box sm-80">
                    {times.map((time, index) => {
                        return <TimeInput key={index} value={time} onChange={(value: number) => { insertAtIndex(value, index) }} className='input-box-content grow' />
                    })}
                    <div className="input-box-content button-field">
                        <button className='button' onClick={() => { setTimes((oldValue) => [...oldValue, 0]); setNumTimes((oldValue) => oldValue + 1) }}>Add Time</button>
                        <button className='button' onClick={() => { if (numTimes !== 1) { setTimes((oldValue) => [...oldValue.slice(0, -1)]); setNumTimes((oldValue) => oldValue - 1) } }}>Remove Time</button>
                        <button className='button' onClick={() => { setTimes([0, 0, 0, 0]); setNumTimes(4) }}>Clear</button>
                    </div>
                </div>
                <div className='output'>
                    <div className="output-text">
                        {output}
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
