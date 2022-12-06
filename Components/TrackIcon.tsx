import { useEffect, useRef } from 'react';
import styles from '../styles/TrackIcon.module.css'
export default function TrackIcon({color = 'black', className = ''}: {color?: string, className?: string}) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        ref.current!.style.setProperty('--color', color)
    }, [ref, color])
    return (
        <div ref={ref} className={styles.trackIcon}></div>
    );
}