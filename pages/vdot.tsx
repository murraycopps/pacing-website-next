import PageWrapper from "../Components/PageWrapper"
import Dropdown from '../Components/Dropdown'
import { useEffect, useState } from "react"

export default function VDOT() {
    const[value, setValue] = useState(0)
    const[index, setIndex] = useState(0)

    return (
        <PageWrapper page="vdot">
            <div>
                VDOT
                <Dropdown items={[{label: "Km", value: 'km'}, {label: "Mile", value: "mi"}]} className='dropdown'  />
            </div>
        </PageWrapper>
    )
}