import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Dropdown.module.css'

interface types {
    items: { label: string, value: any }[],
    className?: string,
    placeholder?: string,
    index?: number,
    value?: any,
    setIndex?: (index: number) => void,
    setValue?: (value: any) => void
}

export default function Dropdown({ items, className = '', placeholder = '', index = 0, value, setIndex = () => { }, setValue = () => { } }: types) {
    if (index === 0 && value !== undefined) {
        setIndex(items.findIndex(item => item.value === value))
    }

    const [thisIndex, setThisIndex] = useState(index)
    const [open, setOpen] = useState(false)
    const [showPlaceholder, setShowPlaceholder] = useState(true)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIndex(thisIndex)
    }, [thisIndex])

    useEffect(() => {
        const handleClickOutside = (event: { target: any }) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);



    return (
        <div ref={ref} className={`${styles.dropdown} ${className}`} onClick={() => setOpen(!open)}>
            <div className={styles.dropdownButton}>
                {items[thisIndex].label}
            </div>
            <div className={`${styles.dropdownContent} ${open ? '' : styles.hidden}`}>
                {items.map((item, currentIndex) => {
                    return (
                        <div key={item.value} className={styles.dropdownItem} onClick={() => {
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
