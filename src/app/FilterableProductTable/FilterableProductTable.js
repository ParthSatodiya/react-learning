import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable"
import {useState} from "react";

export default function FilterableProductTable(props) {

    const [filterText, setFilterText] = useState('');
    const [isStockOnly, setIsStockOnly] = useState(false);


    const handleFilterTextChange = (filterText) => {
        setFilterText(filterText);
    }
    
    const handleInStockChange = (inStockOnly) => {
        setIsStockOnly(inStockOnly);
    }

    return (
        <div>
            <h2>Products</h2>
            <SearchBar
                filterText={filterText}
                isStockOnly={isStockOnly}
                onFilterTextChange={handleFilterTextChange}
                onInStockChange={handleInStockChange}
            />
            <ProductTable
                filterText={filterText}
                isStockOnly={isStockOnly}
                products={props.products}
            />
        </div>
    )
}