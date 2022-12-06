import { useEffect, useState } from 'react'
import TimeInput from '../Components/TimeInput'
import PageWrapper from '../Components/PageWrapper'
import Dropdown from '../Components/Dropdown'
import { outTime } from '../scripts/scripts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'


export default function Home() {
  const [distance, setDistance] = useState(0)
  const [time, setTime] = useState(0)
  const [output, setOutput] = useState([''])
  const [secondOutput, setSecondOutput] = useState([''])
  const [isLong, setIsLong] = useState(false)
  const [custom, setCustom] = useState(0)
  const [isCustomOpen, setIsCustomOpen] = useState(false)

  
  const inputDistances = [
    { value: 200 },
    { value: 400 },
    { value: 800 },
    { value: 1500 },
    { label: 'Mile', value: 1609.34 },
    { label: '3k', value: 3000 },
    { label: '2 Mile', value: 3218.69 },
    { label: '5k', value: 5000 },
    { label: '10k', value: 10000 },
    { label: 'Half Marathon', value: 21097 },
    { label: 'Marathon', value: 42195 },
    { label: 'Custom', value: -1 },
  ]

  useEffect(() => {
    const outputDistances = [
      { value: 100, max: 3218.69, min: 0 },
      { value: 200, max: 5000, min: 0 },
      { value: 400, max: 10000, min: 0 },
      { value: 600, max: 4000, min: 0 },
      { value: 800, max: 20000, min: 0 },
      { value: 1000, max: 10000, min: 0 },
      { value: 1200, max: 3218.69, min: 1200 },
      { value: 1500, max: 40000, min: 0 },
      { value: 1600, max: 1609.34, min: 1600 },
      { value: 1609.34, max: 50000, min: 0 },
      { value: 2000, max: 3218.69, min: 2000 },
      { value: 2400, max: 3218.69, min: 2400 },
      { value: 2800, max: 3218.69, min: 2800 },
      { value: 3000, max: 50000, min: 200 },
      { value: 3218.69, max: 50000, min: 200 },
      { value: 5000, max: 50000, min: 400 },
      { value: 10000, max: 50000, min: 1500 },
      { value: 21097.5, max: 50000, min: 5000 },
      { value: 42195, max: 50000, min: 5000 },
    ]
  
    if (distance === -1) {
      setIsCustomOpen(true)
    } 
    if (distance <= 0 || time <= 0) {
      setOutput([''])
      setSecondOutput([''])
    }
    else if (isLong) {
      const filteredList = outputDistances.filter((item) => {
        const isSplitOption = item.value === 1200 || item.value === 2000 || item.value === 2400 || item.value === 2800
        const isInRange = item.min <= distance && item.max >= distance
        return item.value != distance && (!isSplitOption || isInRange)
      })
      const secondList = filteredList.filter((item, index) => {
        return index >= 11
      })


      setOutput(filteredList.map((dist, index) => {
        return index < 11 ? `${Math.floor(dist.value)}: ${outTime((time / distance) * dist.value)}` : ''
      }))
      setSecondOutput(secondList.map((dist, index) => {
        return `${Math.floor(dist.value)}: ${outTime((time / distance) * dist.value)}`
      }))
    }
    else {
      let counter = 0
      const filteredList = outputDistances.filter((item, index) => {
        const add = item.min <= distance && item.max >= distance && item.value != distance
        if (add) counter++
        return add && counter <= 11
      })
      counter = 0
      const secondList = outputDistances.filter((item, index) => {
        const add = item.min <= distance && item.max >= distance && item.value != distance
        if (add) counter++
        return add && counter > 11
      })
      console.log(filteredList, secondList)
      setOutput(filteredList.map((dist) => {
        return `${Math.floor(dist.value)}: ${outTime((time / distance) * dist.value)}`
      }))
      setSecondOutput(secondList.map((dist) => {
        return `${Math.floor(dist.value)}: ${outTime((time / distance) * dist.value)}`
      }))
    }
  }, [distance, time, isLong])

  useEffect(() => {
    if (custom > 0) {
      setDistance(custom)
    }
  }, [custom])

  return (
    <PageWrapper page="pacing" className={'pacing-page'}>
      <div className="title-box">
        <h1 className='title'>Calculate Paces</h1>
      </div>
      <div className="content-box">
        <div className="input-box">
          <div className="input-box-content no-border" >
            <Dropdown items={inputDistances} placeholder='Distance' setValue={setDistance} className="input-box-content" />
            {isCustomOpen &&
              <div className="input-box-content overlay">
                <input type="number" placeholder="Custom Distance" className='input custom' defaultValue={custom} onChange={(e) => setCustom(parseFloat(e.target.value))} />
                <FontAwesomeIcon icon={faBan} className='icon' onClick={() => setIsCustomOpen(false)} />
              </div>
            }
          </div>
          <TimeInput value={time} onChange={setTime} className="input-box-content" />

          <div className={`switch ${isLong ? 'left' : 'right'}`} onClick={() => setIsLong(!isLong)}>
            {isLong ? 'Show Less' : 'Show More'}
            <span className='switch-item'></span>
          </div>

        </div>
        <div className='output'>
          <div className="output-text">
            {output.join('\n')}
          </div>
          <div className="output-text">
            {secondOutput.join('\n')}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
