import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Dropdown.module.css'

interface types {
    items: { label?: string, value: any }[],
    className?: string,
    placeholder?: string,
    index?: number,
    value?: any,
    setIndex?: (index: number) => void,
    setValue?: (value: any) => void
}

export default function Dropdown({ items, className = '', placeholder = '', index = -1, value, setIndex = () => { }, setValue = () => { } }: types) {
    if (index === -1 && value !== undefined) {
        setIndex(items.findIndex(item => item.value === value))
    }
    items.forEach((item, i) => {
        if (item.label === undefined) {
            items[i].label = item.value
        }
        else {
            items[i].label = item.label
        }
    })

    const [thisIndex, setThisIndex] = useState(index)
    const [open, setOpen] = useState(false)

    const ref = useRef<HTMLDivElement>(null)
    const lastRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const radius = getComputedStyle(ref.current!).borderRadius
        lastRef.current!.style.borderBottomLeftRadius = radius
        lastRef.current!.style.borderBottomRightRadius = radius
    }, [ref.current])

    useEffect(() => {
        setIndex(thisIndex)
    }, [thisIndex])


    return (
        <div
            onBlur={() => setOpen(false)}
            className={`${styles.dropdown} ${className} ${open ? styles.open : ''}`}
            onClick={() => setOpen(!open)}
            ref={ref}>
            <div className={styles.dropdownButton} >
                {thisIndex === -1 ? placeholder : items[thisIndex].label}
                <span className={styles.arrow} />
            </div>
            <div className={`${styles.dropdownContent} ${open ? '' : styles.hidden}`}>
                {items.map((item, currentIndex) => {
                    const thisRef = currentIndex === items.length - 1 ? lastRef : undefined
                    return (
                        <div key={item.value} ref={thisRef} className={styles.dropdownItem} onClick={() => {
                            setThisIndex(currentIndex)
                            setValue(item.value)
                        }}>
                            {item.label}
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}
