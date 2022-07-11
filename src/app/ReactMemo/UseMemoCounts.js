function UseMemoCounts({memoizedValue}) {
    return (
        <div>
            <p>I will only re-render when you click "Force render".</p>
            <p>I'have now rendered: {memoizedValue} time(s)</p>
        </div>
    )
}

export default UseMemoCounts;