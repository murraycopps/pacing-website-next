import NavBar from "./NavBar";
import Head from "next/head";
import { ReactNode } from "react";

export default function PageWrapper({ children, page }: { children: ReactNode, page: string }) {
    return (
        <div className="page">
            <Head>
                <title>Pacing Website</title>
                <meta name="description" content="Calcuate Paces" />
            </Head>
            <NavBar page={page} />
            <div className="page-content">
                {children}
            </div>
        </div>
    );
}