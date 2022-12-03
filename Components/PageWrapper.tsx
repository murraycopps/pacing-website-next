import NavBar from "./NavBar";
import Head from "next/head";
import { ReactNode } from "react";
import { useState } from "react";

export default function PageWrapper({ children, page, className }: { children: ReactNode, page: string, className?: string }) {
    const [wide, setWide] = useState(false)
    return (
        <div className="page">
            <Head>
                <title>Pacing Website</title>
                <meta name="description" content="Calcuate Paces" />
                <meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>                
            </Head>
            <NavBar page={page} onChange={setWide} />
            <div className={`page-content ${className}`}>
                {children}
            </div>
            <div className={`page-overlay ${wide ? '' : 'hidden'}`}></div>
        </div>
    );
} 