import { useState, useEffect } from "react";
import Board from "./board";
import { numOfSquares, boardCols } from "../Utils/utility";
// import { changePosition } from "./snakeFunctions";

const Game = () => {
  const [direction, setDirection] = useState(null);
  const [grid, setGrid] = useState(Array(numOfSquares).fill(null)); //fills an array the size of the game board with null
  const [snake, setSnake] = useState(Array(1).fill(null));
  const [score, setScore] = useState(3);

  function startGame() {
    if (grid.indexOf(5) === -1) {
      const startGrid = [...grid];
      console.log(snake);
      appleSpawn(startGrid);
      startGrid[0] = 5;
      setGrid(startGrid);
      console.log(grid);
    } else {
      console.log(grid);
      alert("Game Already Started");
    }
  }

  // function endConditions(fromIndex, toIndex) {
  //   //bounds

  // }

  function appleSpawn(grid) {
    const randomSpawn = Math.floor(Math.random() * numOfSquares);
    grid[randomSpawn] = 0;
  }

  const appleEaten = () => {
    if (grid.indexOf(0) === -1) {
      appleSpawn(grid);
      const newScore = score + 1;
      setScore(newScore);
      console.log("Apple Eaten! Your New Score Is ", newScore);
    } else return;
  };

  function maintainLength() {
    if (snake.length < score) return;
    else {
      const targetIndex = snake[0];
      snake.shift();
      grid[targetIndex] = null;
    }
  }

  // function updateBoard(snakeArr, boardArr, toIndex, fromIndex) {
  //   snakeArr.push(fromIndex)
  //   boardArr[toIndex] = 5
  //   boardArr[fromIndex]= 3
  //   setSnake(snakeArr)
  //   setGrid(boardArr)
  // }
  // updateBoard(newSnake, newGrid, oldIndex, newIndex)

  const movingRight = (newGrid, newSnake) => {
    const oldIndex = newGrid.indexOf(5);
    const newIndex = newGrid.indexOf(5) + 1;
    newSnake.push(oldIndex);
    newGrid[newIndex] = 5;
    newGrid[oldIndex] = 3;
    setSnake(newSnake);
    setGrid(newGrid);
  };
  const movingLeft = (newGrid, newSnake) => {
    const oldIndex = newGrid.indexOf(5);
    newGrid[newGrid.indexOf(5) - 1] = 5;
    newSnake.push(oldIndex);
    newGrid[oldIndex] = 3;
    setSnake(newSnake);
    setGrid(newGrid);
  };
  const movingUp = (newGrid, newSnake) => {
    const oldIndex = newGrid.indexOf(5);
    newGrid[newGrid.indexOf(5) - boardCols] = 5;
    newSnake.push(oldIndex);
    newGrid[oldIndex] = 3;
    setSnake(newSnake);
    setGrid(newGrid);
  };
  const movingDown = (newGrid, newSnake) => {
    const oldIndex = newGrid.indexOf(5);
    newGrid[newGrid.indexOf(5) + boardCols] = 5;
    newSnake.push(oldIndex);
    newGrid[oldIndex] = 3;
    setSnake(newSnake);
    setGrid(newGrid);
  };

  function autoMove() {
    maintainLength();
    appleEaten();
    const newGrid = [...grid];
    const newSnake = [...snake];
    console.log("autoMove function called");
    if (grid.indexOf(5) === -1) return;
    else if (direction === "movingRight") {
      movingRight(newGrid, newSnake);
    } else if (direction === "movingLeft") {
      movingLeft(newGrid, newSnake);
    } else if (direction === "movingDown") {
      movingDown(newGrid, newSnake);
    } else if (direction === "movingUp") {
      movingUp(newGrid, newSnake);
    } else return;
  }
  // useEffect( () => {
  //   const interval = setInterval(() => {
  //    console.log(direction)
  //    setGrid(autoMove(grid))
  //    return () => clearInterval(interval)
  //   }, 2000)
  // }, [])

  document.onkeydown = function changeDirection(e) {
    const keyPress = e.key;
    console.log(keyPress);
    if (keyPress === "a" && direction !== "movingRight") {
      setDirection("movingLeft");
      autoMove();
    } else if (keyPress === "d" && direction !== "movingLeft") {
      setDirection("movingRight");
      autoMove();
    } else if (keyPress === "s" && direction !== "movingUp") {
      setDirection("movingDown");
      autoMove();
    } else if (keyPress === "w" && direction !== "movingDown") {
      setDirection("movingUp");
      autoMove();
    } else {
      return;
    }
  };

  // function handleClick() {
  //     console.log(NumOfSquares)
  //     console.log(boardCols)
  //     console.log(height)
  // }

  return (
    <div>
      <Board squares={grid} />
      <button onClick={startGame}>Start</button>
      <p>Score: {score}</p>
    </div>
  );
};

export default Game;
