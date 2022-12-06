import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRunning, faStopwatch, faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/NavBar.module.css'
import TrackIcon from './TrackIcon'
import { useEffect, useRef, useState } from 'react'

interface NavBarElementProps {
    wide: boolean,
    icon?: any,
    link: string,
    text: string,
    current: boolean,
    focused?: boolean,
    dropdown?: boolean,
    open?: boolean,
    className?: string,
    onClick?: () => void,
    onBlur?: () => void
}


export default function NavBarElement({ wide = false, icon, link, text, current = false, focused = false, dropdown = false, open = false, className = '', onClick = () => { }, onBlur = () => { } }: NavBarElementProps) {
    const [hovered, setHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(focused)
    const ref = useRef<HTMLAnchorElement>(null)
    const arrowRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (wide) return
        setIsFocused(false)
        setHovered(false)
        ref.current!.blur()
    }, [wide, ref])

    useEffect(() => {
        if (!focused) {
            ref.current!.blur()
        }
    }, [focused, ref])

    useEffect(() => {
        if (!arrowRef.current) return
        arrowRef.current.style.setProperty('--color', (isFocused || hovered) ? 'white' : 'black')
    }, [arrowRef, isFocused, hovered])

    return (
        <Link
            ref={ref}
            href={link}
            className={`${styles.navbarItem} ${className}`}
            onClick={() => { onClick(); setIsFocused(!isFocused); }}
            onBlur={() => { onBlur(); setIsFocused(false); }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {wide ?
                <div className={styles.navbarText}>
                    {text}
                </div>
                : null}
            {(dropdown && wide) ? <span ref={arrowRef} className={`${styles.arrow} ${open ? styles.up : ''}`}></span> : null}
            {icon ?
                <div className={`${styles.navbarIcon} ${current ? styles.current : ''}`}>
                    {icon === 'track' ?
                        <TrackIcon color={hovered || focused ? 'white' : 'black'} /> :
                        <FontAwesomeIcon icon={icon} />}
                </div> : null}
        </Link>
    )
}