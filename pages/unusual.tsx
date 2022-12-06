import { useCallback, useEffect, useRef, useState } from 'react'
import TimeInput from '../Components/TimeInput'
import PageWrapper from '../Components/PageWrapper'
import Dropdown from '../Components/Dropdown'
import { outTime } from '../scripts/scripts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'


export default function Home() {
    const [inputDistance, setInputDistance] = useState(1)
    const [outputDistances, setOutputDistances] = useState([0])
    const [time, setTime] = useState(0)
    const [output, setOutput] = useState([''])

    const outputDistanceRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        if (inputDistance <= 0 || time <= 0) return
        setOutput(outputDistances.map((o) => { return o + ': ' + outTime(o / inputDistance * time) }))
    }, [outputDistances, inputDistance, time])

    return (
        <PageWrapper page="unusual" className={'pacing-page'}>
            <div className="title-box">
                <h1 className='title'>Convert Unusual Distances</h1>
            </div>
            <div className="content-box">
                <div className="input-box">
                    <input type="number" placeholder='Input Distance' onChange={(e) => { if (e.target.value !== '') setInputDistance(parseFloat(e.target.value)); else setInputDistance(0) }} className='input-box-content input' />
                    <TimeInput value={time} onChange={setTime} className='input-box-content' />

                    <input type="number" ref={outputDistanceRef} placeholder='Output Distance' onChange={(e) => setOutputDistances((oldValue) => [...oldValue.slice(0, -1), e.target.valueAsNumber])} className='input-box-content input' />

                    <div className="input-box-content button-field">
                        <button className='button' onClick={() => { setOutputDistances((oldValue) => [...oldValue, 0]); if (outputDistanceRef.current) outputDistanceRef.current.value = '' }}>Add Distance</button>
                        <button className='button' onClick={() => { if (outputDistances.length !== 1) { setOutputDistances((oldValue) => [...oldValue.slice(0, -1)]); if (outputDistanceRef.current) outputDistanceRef.current.value = outputDistances[outputDistances.length - 2].toString() } }}>Remove Distance</button>
                        <button className='button' onClick={() => setOutputDistances([0])}>Clear</button>

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
