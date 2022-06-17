export default function ProductTable(props) {

    const filterText = props.filterText;
    const isStockOnly = props.isStockOnly;

    const rows = [];
    let lastCategory;
    props.products.forEach((product) => {

        if (product.name.indexOf(filterText) === -1) {
            return;
        }

        if (isStockOnly && !product.stocked) {
            return;
        }

        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow 
                    name={product.category}
                    key={product.category}
                />
            );
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        );
        lastCategory = product.category;
        
    });
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

function ProductCategoryRow(props) {
    return (
        <tr>
            <th colSpan='2'>{props.name}</th>
        </tr>
    )
}

function ProductRow(props) {
    const product = props.product;
    const name = product.stocked ?
        product.name :
        <span style={{color: 'red'}}>
            {product.name}
        </span>
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}