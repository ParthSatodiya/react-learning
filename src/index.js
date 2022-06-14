import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Game(props) {

    const [history, setHistory] = useState([{
        squares: Array(9).fill(null)
    }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    function handleCLick(i) {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        if (calculateWinner(current.squares) || current.squares[i]) {
            return;
        }
        const squares = current.squares.slice();
        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(newHistory.concat([{
            squares: squares,
        }]));
        setXIsNext(!xIsNext);
        setStepNumber(newHistory.length);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext((step % 2) === 0)
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ? "Go to move #"+move : "GO to start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div>
            <h2>Tic-Tac-Toe</h2>
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares} 
                        xIsNext={xIsNext}
                        onClick={(i) => handleCLick(i)}
                    >

                    </Board>
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    )
}

function Board(props) {

    function renderSquare(i) {
        return (<Square
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
        />);
    }

    return (
        <div>
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

// class Square extends React.Component {
//     render() {
//         return (
//             <button 
//                 className='square'
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         )
//     }
// }

function Square(props) {
    return (
        <button 
            className='square'
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}


// Product table components


function FilterableProductTable(props) {

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

function SearchBar(props) {

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

function ProductTable(props) {

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


const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <div>
        <Game/>
        <hr></hr>
        <FilterableProductTable products={products}/>
    </div>
)