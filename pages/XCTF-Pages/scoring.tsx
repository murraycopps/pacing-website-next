import PageWrapper from "../../Components/PageWrapper";

export default function Scoring() {
    return (
        <PageWrapper page='scoring' className="page-content">
            <h1>Scoring</h1>
            <p>Scoring is based on the following formula:</p>
            <p>Score = (Time / Distance) * 1000</p>
            <p>For example, if you ran a 5k in 20 minutes, your score would be 1200.</p>
            <p>For a 10k, your score would be 600.</p>
        </PageWrapper>
    );
}