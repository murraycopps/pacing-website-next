import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRunning, faStopwatch, faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/NavBar.module.css'

export default function NavBar({ wide = false, icon = faHome, link = '../', text = 'Home', current = false }: { wide: boolean, icon: any, link: string, text: string, current: boolean }) {
    return (
        <Link href={link} className={styles.navbarItem}>
            {wide ?
                <div className={styles.navbarText}>
                    {text}
                </div>
                : null}
            <div className={`${styles.navbarIcon} ${current ? styles.current : ''}`}>
                <FontAwesomeIcon icon={icon} />
            </div>
        </Link>
    )
}