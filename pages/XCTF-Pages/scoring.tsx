import { useEffect, useState } from "react";
import PageWrapper from "../../Components/PageWrapper";
import styles from '../../styles/Scoring.module.css'
import { getXCScores, getTrackScores } from "../../scripts/scoring";
import Dropdown from "../../Components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import React from "react";

type Any = any;

export default function Scoring() {
    const [inputs, setInputs] = useState([0, 0, 0, 0, 0, 0, 0])
    const [isTrack, setIsTrack] = useState(false)
    const [scores, setScores] = useState<Any>(null)
    const [numEvents, setNumEvents] = useState(0)
    const [custom, setCustom] = useState(false)
    const [index, setIndex] = useState(-1)

    const inputRefs = Array(10).fill(0).map((_, i) => React.createRef<HTMLInputElement>())

    const eventOptions = [
        { label: 'Indoor - 10 Events', value: 10 },
        { label: 'Outdoor - 16 Events', value: 16 },
        { label: "Professional - 21 Events", value: 21 },
        { label: "Custom", value: 0 }
    ]


    const insertAtIndex = (value: any, index: number) => {
        if (value === '') value = 0
        const newArray = [...inputs];
        newArray[index] = parseFloat(value);
        setInputs(newArray);
    }

    useEffect(() => {
        setInputs(isTrack ? [0, 0, 0, 0, 0, 0] : [0, 0, 0])
        if(!inputRefs[0].current) return
        inputRefs.forEach((ref: any) => {
            if(ref.current) ref.current.value = ''
        })
    }, [isTrack, inputRefs])

    useEffect(() => {
        if (isTrack) {
            const scores = getTrackScores(inputs, numEvents)
            setScores(scores)
        }
        else {
            const scores = getXCScores(inputs)
            setScores(scores)
        }
    }, [inputs, numEvents, isTrack])
    return (
        <PageWrapper page='scoring' className="page-content">
            <div className="title-box">
                <h1 className='title'>Calculate {isTrack ? 'Track' : 'XC'} Scores</h1>
            </div>
            <div className="content-box">
                <div className="input-box">

                    {isTrack ?
                        <>
                            <div className={`${styles["input-box-content"]}`} style={{ height: '6rem', padding: 0, border: 'none' }}>
                                <Dropdown className={styles.dropdown} placeholder="Enter Number of Events" index={index} setIndex={setIndex} items={eventOptions} setValue={(value: number) => { setNumEvents(value); setCustom(value === 0) }} />
                                {custom ? <div className={styles.overlay}>
                                    <input type="number" placeholder="Custom Distance" className='input custom' defaultValue={numEvents} onChange={(e) => setNumEvents(parseFloat(e.target.value ? e.target.value : '0'))} />
                                    <FontAwesomeIcon icon={faBan} className='icon' onClick={() => setCustom(false)} />
                                </div> : null}
                            </div>
                            <div className={`${styles["input-box-content"]}`} style={{ height: '6rem' }}>
                                <label htmlFor="num-firsts">Firsts: </label>
                                <input ref={inputRefs[0]} type="number" name="num-firsts" id="num-firsts" placeholder="Num-Firsts" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 0)} />
                            </div>

                            <div className={`${styles["input-box-content"]}`} style={{ height: '6rem' }}>
                                <label htmlFor="num-seconds">Seconds: </label>
                                <input ref={inputRefs[1]} type="number" name="num-seconds" id="num-seconds" placeholder="Num-Seconds" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 1)} />
                            </div>

                            <div className={`${styles["input-box-content"]}`} style={{ height: '6rem' }}>
                                <label htmlFor="num-thirds">Thirds: </label>
                                <input ref={inputRefs[2]} type="number" name="num-thirds" id="num-thirds" placeholder="Num-Thirds" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 2)} />
                            </div>
                            <div style={{ flexGrow: 100 }}></div>

                        </>
                        : <>
                            <div className={styles["input-box-content"]}>
                                <label htmlFor="1st">First Place: </label>
                                <input ref={inputRefs[3]} type="number" placeholder="1st Place" name="1st" id="1st" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 0)} />
                            </div>

                            <div className={styles["input-box-content"]}>
                                <label htmlFor="2nd">Second Place: </label>
                                <input ref={inputRefs[4]} type="number" placeholder="2nd Place" name="2nd" id="2nd" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 1)} />
                            </div>

                            <div className={styles["input-box-content"]}>
                                <label htmlFor="3rd">Third Place: </label>
                                <input ref={inputRefs[5]} type="number" placeholder="3rd Place" name="3rd" id="3rd" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 2)} />
                            </div>

                            <div className={styles["input-box-content"]}>
                                <label htmlFor="4th">Fourth Place: </label>
                                <input ref={inputRefs[6]} type="number" placeholder="4th Place" name="4th" id="4th" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 3)} />
                            </div>

                            <div className={styles["input-box-content"]}>
                                <label htmlFor="5th">Fifth Place: </label>
                                <input ref={inputRefs[7]} type="number" placeholder="5th Place" name="5th" id="5th" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 4)} />
                            </div>

                            <div className={styles["input-box-content"]}>
                                <label htmlFor="6th">Sixth Place: </label>
                                <input ref={inputRefs[8]} type="number" placeholder="6th Place" name="6th" id="6th" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 5)} />
                            </div>

                            <div className={styles["input-box-content"]}>
                                <label htmlFor="7th">Seventh Place: </label>
                                <input ref={inputRefs[9]} type="number" placeholder="7th Place" name="7th" id="7th" className={styles["input"]} onChange={(event) => insertAtIndex(event.target.value, 6)} />
                            </div>
                        </>}
                    <div className={`switch ${isTrack ? 'left' : 'right'}`} onClick={() =>  setIsTrack(!isTrack)}>
                        {isTrack ? 'Track' : 'XC'}
                        <span className='switch-item'></span>
                    </div>


                </div>

                <div className='output'>
                    <div className="output-text">
                        {scores}
                    </div>
                </div>

            </div>
        </PageWrapper >
    );
}