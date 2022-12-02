import NavBar from "./NavBar";
import Head from "next/head";
import { ReactNode } from "react";
import { useState } from "react";

export default function PageWrapper({ children, page }: { children: ReactNode, page: string }) {
    const [wide, setWide] = useState(false)
    return (
        <div className="page">
            <Head>
                <title>Pacing Website</title>
                <meta name="description" content="Calcuate Paces" />
            </Head>
            <NavBar page={page} onChange={setWide} />
            <div className="page-content">
                {children}
            </div>
            <div className={`page-overlay ${wide ? '' : 'hidden'}`}></div>
        </div>
    );
}