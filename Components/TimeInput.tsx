import { useEffect, useState } from "react"
import styles from '../styles/TimeInput.module.css'
export default function TimeInput({ value, onChange, className = "" }: { value: number, onChange: (value: number) => void, className?: string }) {
    const [min, setMin] = useState(Math.floor(value / 60))
    const [sec, setSec] = useState(value % 60)
    useEffect(() => {
        onChange(min * 60 + sec)
    }, [min, sec])
    return (
        <div className={`${className} ${styles.timeInputField}`}>
            <input type="number" name="min" id="min" className={styles.timeInput} defaultValue={min} onChange={(event) => { if (event.target.value != "") setMin(parseFloat(event.target.value)) }} />
            <span className={styles.timeInputSeparator}>:</span>
            <input type="number" name="sec" id="sec" className={styles.timeInput} defaultValue={sec} onChange={(event) => { if (event.target.value != "") setSec(parseFloat(event.target.value)) }} />
        </div>
    )
}