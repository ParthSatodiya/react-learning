import React, { useEffect, useRef } from "react";

function Count() {
    const renderCount = useRef(0);

    useEffect(() => {
        console.log('insider count effect'+renderCount.current);
    })
    console.log('inside count component'+renderCount.current);

    return (
        <p>Nothing has changed but this is rendered {renderCount.current++} times!</p>
    );
}

export const CountWithoutMemo = Count;
export const CountWithMemo = React.memo(Count);