import { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../styles/TrackIcon.module.css'
export default function TrackIcon({color = 'black', className = ''}: {color?: string, className?: string}) {
    const ref = useRef<HTMLDivElement>(null)

    const isBreakpoint = useMediaQuery(768);
    

    useEffect(() => {
        ref.current!.style.setProperty('--color', color)

        if(isBreakpoint){
            ref.current!.style.setProperty('--color', 'black')
        }

    }, [ref, color, isBreakpoint])

    return (
        <div ref={ref} className={`${styles.trackIcon} ${className}`}></div>
    );
}


const useMediaQuery = (width: any) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: { matches: any; }) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);
        media.addListener(updateTarget);

        // Check on mount (callback is not called until a change occurs)
        if (media.matches) {
            setTargetReached(true);
        }

        return () => media.removeListener(updateTarget);
    }, [updateTarget, width]);

    return targetReached;
};