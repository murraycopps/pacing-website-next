import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRunning, faStopwatch, faUser } from '@fortawesome/free-solid-svg-icons'
import NavBarElement from './NavBarElement'
import styles from '../styles/NavBar.module.css'
export default function NavBar({ page }: { page: string }) {
    const [wide, setWide] = useState(false)

    return (
        <div
            className={`${styles.navbar} ${wide ? styles.wide : styles.thin}`}
            onMouseEnter={() => setWide(true)}
            onMouseLeave={() => setWide(false)}
        >

            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faHome} link="/" text="Pacing" current={page === 'pacing'} />
            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faRunning} link="/vdot" text="VDOT" current={page === 'vdot'} />
            <span className={styles.navbarBorder} />
        </div>
    )
}