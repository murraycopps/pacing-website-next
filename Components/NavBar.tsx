import Link from 'next/link'
import { useEffect, useState } from 'react'
import { on } from 'stream'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRunning, faStopwatch, faUser } from '@fortawesome/free-solid-svg-icons'
export default function NavBar({ page }: { page: string }) {
    const [wide, setWide] = useState(false)

    return (
        <div
            className={`navbar ${wide ? "wide" : ""}`}
            onMouseEnter={() => setWide(true)}
            onMouseLeave={() => setWide(false)}
        >



            <div className={`navbar-icon ${page === 'home' ? 'current' : ''}`}>
                {wide ?
                    <div className="navbar-text">
                        Home
                    </div>
                    : null}
                <Link href="../">
                    <FontAwesomeIcon icon={faHome} />
                </Link>

            </div>

            <div className={`navbar-icon ${page === 'vdot' ? 'current' : ''}`}>
                {wide ?
                    <div className="navbar-text">
                        VDOT
                    </div>
                    : null}
                <Link href="../vdot">
                    <FontAwesomeIcon icon={faRunning} />
                </Link>
            </div>
        </div>
    )
}