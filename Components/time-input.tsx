import { useEffect, useState } from "react"
export default function TimeInput({ value, onChange, className = "" }: { value: number, onChange: (value: number) => void, className?: string }) {
    const [min, setMin] = useState(Math.floor(value / 60))
    const [sec, setSec] = useState(value % 60)
    useEffect(() => {
        onChange(min * 60 + sec)
    }, [min, sec])
    return (
        <div className={className+" time-input-field"}>
            <input type="number" name="min" id="min" className="time-input" defaultValue={min} onChange={(event) => { if (event.target.value != "") setMin(parseFloat(event.target.value)) }} />
            <span className="time-input-separator">:</span>
            <input type="number" name="sec" id="sec" className="time-input" defaultValue={sec} onChange={(event) => { if (event.target.value != "") setSec(parseFloat(event.target.value)) }} />
        </div>
    )
}