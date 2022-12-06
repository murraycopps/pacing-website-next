import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faHome, faRunning, faStopwatch, faUser } from '@fortawesome/free-solid-svg-icons'
import NavBarElement from './NavBarElement'
import styles from '../styles/NavBar.module.css'
export default function NavBar({ page, onChange }: { page: string, onChange: (wide: boolean) => void }) {
    const [wide, setWide] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

       


    useEffect(() => {
        onChange(wide)
    }, [wide, onChange])

    return (
        <div
            className={`${styles.navbar} ${wide ? styles.wide : styles.thin}`}
            onMouseEnter={() => setWide(true)}
            onMouseLeave={() => setWide(false)}
        >

            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faHome} link="/" text='Pacing' current={page === 'pacing'} />
            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faRunning} link="/vdot" text='VDOT' current={page === 'vdot'} />
            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faStopwatch} link="/convert" text='Convert' current={page === 'convert'} />
            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faCalculator} link="/unusual" text='Unusual' current={page === 'unusual'} />
            <span className={styles.navbarBorder} />
            <div className={styles.section} onMouseLeave={()=>{setDropdownOpen(false)}}>
                <NavBarElement wide={wide} focused={dropdownOpen} dropdown={true} icon={'track'} link="" text='XCTF-Pages' current={page === 'scoring'} open={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)} />
                {(dropdownOpen && wide) ?
                    <div className={styles.dropdown}>
                        <span className={styles.navbarBorder} />
                        <NavBarElement wide={wide} link="/XCTF-Pages/scoring" text='Scoring' current={page === 'scoring'} className={styles.navbarDropdownContent}/>
                        <span className={styles.navbarBorder} />
                    </div>
                    : null}
            </div>
            <span className={styles.navbarBorder} />

        </div>
    )
}