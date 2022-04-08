import { useState, useEffect } from "react";
import Board from "./board";
import { numOfSquares, boardCols, boardRows } from "../Utils/utility";

const Game = () => {
  //initial direction
  const [direction, setDirection] = useState("movingRight");
  //fills an array the size of the game board with null
  const [grid, setGrid] = useState(Array(numOfSquares).fill(null));
  //array to keep track of snake length
  const [snake, setSnake] = useState(Array(1).fill(null));

  const [score, setScore] = useState(3);

  // Everything needed for game start
  function startGame() {
    if (grid.indexOf(5) === -1) {
      const startGrid = [...grid];
      appleSpawn(startGrid);
      startGrid[0] = 5;
      setGrid(startGrid);
    } else {
      alert("Game Already Started");
    }
  }

  //restores default states
  const reset = () => {
    setGrid(Array(numOfSquares).fill(null));
    setSnake(Array(1).fill(null));
    setScore(3);
    setDirection("movingRight");
  };


  function endConditions(fromIndex, toIndex) {
    for (var i = 0; i < boardRows; i++) {
      if (
        (fromIndex === i * boardCols - 1 && toIndex === i * boardCols) || // crosses edge going right
        (fromIndex === i * boardCols && toIndex === i * boardCols - 1) || // crosses edge going left
        toIndex > numOfSquares - 1 || // crosses edge going down
        grid[toIndex] === 3 || // crosses snake body
        toIndex < 0 // crosses edge going up
      ) {
        alert("Game Over!");
        reset();
        return true;
      }
    }
  }

  // spawns apple in an unoccupied spot
  function appleSpawn(array) {
    const randomSpawn = Math.floor(Math.random() * numOfSquares);
    if (array[randomSpawn] != null) appleSpawn(array)
    else array[randomSpawn] = 0;
  }

  // checks to see if an apple has been eaten
  const appleEaten = () => {
    if (grid.indexOf(0) === -1) {
      appleSpawn(grid);
      const newScore = score + 3;
      setScore(newScore);
      console.log("Apple Eaten! Your New Score Is ", newScore);
    } else return;
  };

  // maintains snake length based on score 
  function maintainLength() {
    if (snake.length < score) return;
    else {
      const targetIndex = snake[0];
      snake.shift();
      grid[targetIndex] = null;
    }
  }

  // bulk of functionality 
  function autoMove() {
    // first makes sure snake length coincides with score
    maintainLength();

    // checks if apple was eaten during the last interval
    appleEaten();
    
    const newGrid = [...grid];

    const newSnake = [...snake];

    const oldIndex = newGrid.indexOf(5);

    // repetitive code turned into a function
    function necessaryUpdates(newIndex) {
      newSnake.push(oldIndex);
      newGrid[newIndex] = 5;
      newGrid[oldIndex] = 3;
      setSnake(newSnake);
      setGrid(newGrid);
      endConditions(oldIndex, newIndex);
    }

    // makes move based on the state of direction
    if (direction === "movingRight") {
      const newIndex = newGrid.indexOf(5) + 1;
      necessaryUpdates(newIndex);
    } else if (direction === "movingLeft") {
      const newIndex = newGrid.indexOf(5) - 1;
      necessaryUpdates(newIndex);
    } else if (direction === "movingDown") {
      const newIndex = newGrid.indexOf(5) + boardCols;
      necessaryUpdates(newIndex);
    } else if (direction === "movingUp") {
      const newIndex = newGrid.indexOf(5) - boardCols;
      necessaryUpdates(newIndex);
    } else return;
  }

  // interval 
  useEffect(() => {
    const interval = setInterval(() => {
      if (grid.indexOf(5) === -1) {
        return;
      } else {
        autoMove();
      }
    }, 90);
    return () => {
      clearInterval(interval);
    };
  });


  // changes direction based on key pressed
  document.onkeydown = function changeDirection(e) {
    const keyPress = e.key;
    console.log(keyPress);
    if (grid.indexOf(5) === -1) return;
    else if ((keyPress === "a") && direction !== "movingRight") {
      setDirection("movingLeft");
    } else if ((keyPress === "d" )&& direction !== "movingLeft") {
      setDirection("movingRight");
    } else if ((keyPress === "s" )&& direction !== "movingUp") {
      setDirection("movingDown");
    } else if ((keyPress === "w")&& direction !== "movingDown") {
      setDirection("movingUp");
    } else {
      return;
    }
  };

  return (
    <div>
      <Board squares={grid} />
      <button onClick={startGame}>Start</button>
      <button onClick={reset}>Reset</button>
      <p>Score: {score}</p>
    </div>
  );
};

export default Game;
