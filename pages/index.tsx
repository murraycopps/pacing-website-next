import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import TimeInput from '../Components/TimeInput'
import PageWrapper from '../Components/PageWrapper'
import Dropdown from '../Components/Dropdown'


export default function Home() {
  const [distance, setDistance] = useState(0)
  const [time, setTime] = useState(0)
  const [output, setOutput] = useState([''])
  const [isPace, setIsPace] = useState(true)

  const outputDistances = [
    100,
    200,
    400,
    800,
    1500,
    1609.34,
    3000,
    3218.38,
    5000,
    10000,
    21097,
    42195,
  ]

  const inputDistances = [
    { value: 200 },
    { value: 400 },
    { value: 800 },
    { value: 1500 },
    { label: 'Mile', value: 1609.34 },
    { label: '3k', value: 3000 },
    { label: '2 Mile', value: 3218.68 }
  ]

  useEffect(() => {
    if (distance == 0 || time == 0) setOutput([])
    else {
      const filteredList = outputDistances.filter((item) => item <= distance)
      setOutput(filteredList.map((dist) => {
        return `${Math.floor(dist)}: ${Math.floor((time / distance) * 100 * dist) / 100}`
      }))
    }

  }, [distance, time])

  return (
    <PageWrapper page="pacing" className={'pacing-page'}>
      <div className="title-box">
        <h1 className='title'>Calculate {isPace ? 'Paces' : 'Splits'}</h1>
      </div>
      <div className="content-box">
        <div className="input-box">
            <Dropdown items={inputDistances} placeholder='Distance' setValue={setDistance} className="input-box-content" />
          <div className={`switch ${isPace ? 'pace' : 'split'}`} onClick={() => setIsPace(!isPace)}>
            {isPace ? 'Pace' : 'Split'}
            <span className='switch-item'></span>
          </div>

            <TimeInput value={time} onChange={setTime} className="input-box-content" />
        </div>
        <div className='output'>
          {output.join('\n')}
        </div>
      </div>
    </PageWrapper>
  )
}
