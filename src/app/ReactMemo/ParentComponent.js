import { useEffect, useState } from "react";
import { CountWithoutMemo, CountWithMemo } from "./Counts"

const WINTER = "winter";
const SUMMER = "summer";
const MONSOON = "monsoon";

const RAIN_COAT = "rain_coat";
const SWEATER = "sweater";
const SHORTS = "shorts";
const SHIRT = "shirt";

export default function ParentComponent()  {
    const [season, setSeason] = useState("");
    const [clothType, setClothType] = useState("");

    const appropriateCloth = () => {
        switch (season) {
            case WINTER:
                return setClothType(SWEATER);
            case SUMMER:
                return setClothType(SHORTS);
            case MONSOON:
                return setClothType(RAIN_COAT);
            default:
                return SHIRT;
        }
    }

    useEffect(() => {
        appropriateCloth();
        console.log('inside parent effect');
    }, [season]);
    

    return (
        <div className="small-container text-center">
            <h2>Using memo with child component</h2>
            Select season:
            <select value={season}
                style={{width: "200px", "margin-left": "auto", "margin-right": "auto"}}
                onChange={(event) => setSeason(event.target.value)}>
                <option value="">-</option>
                <option value={WINTER}>Winter</option>
                <option value={SUMMER}>Summer</option>
                <option value={MONSOON}>Monsoon</option>
            </select>
            <p>Appropriate cloth is: {clothType}</p>
            <div className="margin-bottom" style={{border: "1px solid #ccc", "border-radius": "5px"}}>
                <CountWithoutMemo/>
                <CountWithMemo/>
            </div>
        </div>
    )
}