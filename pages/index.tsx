import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import TimeInput from '../Components/time-input'
import PageWrapper from '../Components/PageWrapper'
export default function Home() {
  const [distance, setDistance] = useState(0)
  const [time, setTime] = useState(0)
  const [speed, setSpeed] = useState(0)

  useEffect(() => {
    if (distance == 0 || time == 0) setSpeed(0)
    else setSpeed(parseFloat((3600 * distance / time).toFixed(2)))
  }, [distance, time])

  return (
    <PageWrapper page="home">
      <div className={styles.container}>
        <h1>Calculate Paces</h1>
        <p>Enter your distance and time to calculate your pace</p>
        <div className="calc-container">
          <input type="number" name="distance" className="input" id="distance" defaultValue={distance} onChange={(event) => { if (event.target.value != "") setDistance(parseFloat(event.target.value)) }} />
          <TimeInput value={time} onChange={setTime} />
        </div>

        <div>
          {speed}
        </div>
      </div>
    </PageWrapper>
  )
}
