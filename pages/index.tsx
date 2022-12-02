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
    1609,
    3000,
    5000,
    10000,
    21097,
    42195,
  ]

  const inputDistances = [
    {value: 200},
    {value: 400},
    {value: 800},
    {value: 1500},
    {label: 'Mile', value: 1609.3},
    {label: '3k',value: 3000},
    {label: '2 Mile', value: 3218.6}
  ]

  useEffect(() => {
    if (distance == 0 || time == 0) setOutput([])
    else {
      const filteredList = outputDistances.filter
      setOutput(outputDistances.map((dist) => {
        return `${dist}: ${Math.floor((time / distance) * dist)}`
      }))
    }

  }, [distance, time])

  return (
    <PageWrapper page="pacing">
      <h1>Calculate Paces</h1>
      <p>Enter your distance and time to calculate your pace</p>
      <div className="calc-container">
        <TimeInput value={time} onChange={setTime} className="half" />
        <Dropdown items={inputDistances} placeholder='Distance' setValue={setDistance} className="half" />
      </div>
      <div className='output'>
        {output.join('\n')}
      </div>
    </PageWrapper>
  )
}
