import { useCallback, useEffect, useRef, useState } from 'react'
import { faCalculator, faHome, faMountain, faRunning, faStopwatch, faUser } from '@fortawesome/free-solid-svg-icons'
import NavBarElement from './NavBarElement'
import styles from '../styles/NavBar.module.css'
export default function NavBar({ page, onChange }: { page: string, onChange: (wide: boolean) => void }) {
    const [wide, setWide] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const isBreakpoint = useMediaQuery(768);

       


    useEffect(() => {
        onChange(wide)
    }, [wide, onChange])

    return (
        <div
            className={`${styles.navbar} ${wide ? styles.wide : styles.thin}`}
            onMouseEnter={() => {if(!isBreakpoint) setWide(true)}}
            onMouseLeave={() => setWide(false)}
        >

            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faHome} link="/" text='Pacing' current={page === 'pacing'} />
            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faRunning} link="/vdot" text='VDOT' current={page === 'vdot'} />
            <span className={styles.navbarBorder} />
            <div className={styles.section} onMouseLeave={()=>{setDropdownOpen(false)}}>
                <NavBarElement wide={wide} focused={dropdownOpen} dropdown={true} icon={'track'} link="" text='XCTF-Pages' current={page === 'scoring' || page === 'relay'} open={dropdownOpen} onClick={() => {setDropdownOpen(!dropdownOpen); if(isBreakpoint) setWide(!wide)}} />
                {(dropdownOpen && wide) ?
                    <div className={styles.dropdown}>
                        <span className={styles.navbarBorder} />
                        <NavBarElement wide={wide} link="/XCTF-Pages/scoring" text='Scoring' current={page === 'scoring'} className={styles.navbarDropdownContent}/>
                        <span className={styles.navbarBorder} />
                        <NavBarElement wide={wide} link="/XCTF-Pages/relay" text='Relay' current={page === 'relay'} className={styles.navbarDropdownContent}/>
                        <span className={styles.navbarBorder} />
                    </div>
                    : null}
            </div>
            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faStopwatch} link="/convert" text='Convert' current={page === 'convert'} />
            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faCalculator} link="/unusual" text='Unusual' current={page === 'unusual'} />
            <span className={styles.navbarBorder} />
            <NavBarElement wide={wide} icon={faMountain} link="/hill" text='Hills' current={page === 'hill'} />
            <span className={styles.navbarBorder} />

        </div>
    )
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