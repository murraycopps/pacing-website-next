import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import TimeInput from '../Components/time-input'
import PageWrapper from '../Components/PageWrapper'
import Dropdown from '../Components/Dropdown'


export default function Home() {
  const [distance, setDistance] = useState(0)
  const [time, setTime] = useState(0)
  const [output, setOutput] = useState([''])

  const outputDistances =[
    100,
    200,
    400,
    800,
    1500,
    1609,
    3000,
    5000,
    10000,
    21097,
    42195,
  ]

  useEffect(() => {
    if (distance == 0 || time == 0) setOutput([])
    else {
      setOutput(outputDistances.map((dist) => {
        return `${dist}: ${Math.floor((time / distance) * dist)}`
      }))
    }

  }, [distance, time])

  return (
    <PageWrapper page="pacing">
      <div className='pacing'>
        <h1>Calculate Paces</h1>
        <p>Enter your distance and time to calculate your pace</p>
        <div className="calc-container">
          <input type="number" name="distance" className="input" id="distance" defaultValue={distance} onChange={(event) => { if (event.target.value != "") setDistance(parseFloat(event.target.value)) }} />
          <TimeInput value={time} onChange={setTime} />
        </div>
        <div className='output'>
          {output.join('\n')}
        </div>
      </div>
    </PageWrapper>
  )
}
