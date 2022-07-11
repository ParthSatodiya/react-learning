import { useEffect, useState, useRef, useMemo } from "react";
import { CountWithoutMemo, CountWithMemo } from "./Counts"
import UseMemoCounts from "./UseMemoCounts";

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
    const [times, setTimes] = useState(0);
    const useMemoRef = useRef(0);

    const incrementUseMemoRef = () => useMemoRef.current++;

    // uncomment the next line to test that <UseMemoCounts /> will re-render every t ime the parent re-renders.
    // const memoizedValue = useMemoRef.current++;

    // the next line ensures that <UseMemoCounts /> only renders when the times value changes
    const memoizedValue = useMemo(() => incrementUseMemoRef(), [times]);
    


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
                style={{width: "200px", "marginLeft": "auto", "marginRight": "auto"}}
                onChange={(event) => setSeason(event.target.value)}>
                <option value="">-</option>
                <option value={WINTER}>Winter</option>
                <option value={SUMMER}>Summer</option>
                <option value={MONSOON}>Monsoon</option>
            </select>
            <p>Appropriate cloth is: {clothType}</p>
            <div className="margin-bottom" style={{border: "1px solid #ccc", "borderRadius": "5px", "paddingTop": "24px"}}>
                <CountWithoutMemo/>
                <CountWithMemo/>
            </div>
            <div style={{border: "1px solid #ccc", "borderRadius": "5px", "paddingTop": "24px"}}>
                <button onClick={() => setTimes(times+1)}>Force render</button>
                <UseMemoCounts memoizedValue={memoizedValue}/>
            </div>
        </div>
    )
}