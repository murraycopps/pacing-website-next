import { useEffect, useState } from 'react'
import TimeInput from '../Components/TimeInput'
import PageWrapper from '../Components/PageWrapper'
import Dropdown from '../Components/Dropdown'
import { outTime } from '../scripts/scripts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'


export default function Home() {
    const [time, setTime] = useState(0)


    const [elevation, setElevation] = useState(0);
    const [output, setOutput] = useState('');
    const [isPrediction, setIsPrediction] = useState(false);

    useEffect(() => {
        let newTime = time;
        if (!isPrediction) newTime -= 1.74 * elevation / 10;
        else newTime += 1.74 * elevation / 10;
        newTime = Math.max(newTime, 0);
        newTime = Math.round(newTime * 100) / 100;
        setOutput(outTime(newTime));
    }, [time, elevation, isPrediction]);


    return (
        <PageWrapper page="hill" className={'pacing-page'}>
            <div className="title-box">
                <h1 className='title'>Calculate Hill Pace</h1>
            </div>
            <div className="content-box">
                <div className="input-box">
                    <div className='input-box-content'> {isPrediction ? 'Time on Flat' : 'Time on Hill'} </div>
                    <TimeInput value={time} onChange={setTime} className='input-box-content' />
                    <input type="number" placeholder='Elevation Change' onChange={(e) => { if (e.target.value !== '') setElevation(parseFloat(e.target.value)); else setElevation(0) }} className='input-box-content input' />
                    <div className={`switch ${isPrediction ? 'left' : 'right'}`} onClick={() => setIsPrediction(!isPrediction)}>
                        {isPrediction ? 'Prediction' : 'Conversion'}
                        <span className='switch-item'></span>
                    </div>

                </div>
                <div className='output'>
                    <div className="output-text">
                    {isPrediction ? 'Time on Hill' : 'Time on Flat'}: {output}
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
