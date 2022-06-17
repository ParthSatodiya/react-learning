import {useState} from "react";
import Board from "./Board";

export default function Game(props) {

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