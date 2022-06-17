export default function SearchBar(props) {

    const filterText = props.filterText;
    const isStockOnly = props.isStockOnly;

    const handleFilterTextChange = (e) => {
        props.onFilterTextChange(e.target.value);
    }
    
    const handleInStockChange = (e) => {
        props.onInStockChange(e.target.checked);
    }

    return (
        <form>
            <input
                type='text'
                value={filterText}
                onChange={handleFilterTextChange}
            />
            <p>
                <input
                    type='checkbox'
                    checked={isStockOnly}
                    onChange={handleInStockChange}
                />
                Only show product in stock
            </p>
        </form>
    )
}