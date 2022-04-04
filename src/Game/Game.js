import {useState} from "react";
import Board from "./board";
import {NumOfSquares, boardRows, boardCols, width, height} from "../Utils/utility"

const Game = () => {
    const [grid, setGrid] = useState(Array(NumOfSquares).fill(null))
    function handleClick() {
        console.log(NumOfSquares)
        console.log(boardCols)
        console.log(boardRows)
        console.log(width)
        console.log(height)
    }

  return (
    <div>
      <Board squares={grid}/>
      {/* <button onClick={handleClick}>
      </button> */}
    </div>
  );
};

export default Game;
