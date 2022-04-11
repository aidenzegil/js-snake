import { useState, useEffect } from "react";
import Board from "./board";
import { numOfSquares, boardCols, boardRows } from "../Utils/utility";

const Game = () => {
  // constatants
  const SNAKE_HEAD = 2;
  const SNAKE_BODY = 1;
  const APPLE = "o";
  const MOVING_RIGHT = "movingRight";
  const MOVING_LEFT = "movingLeft";
  const MOVING_UP = "movingUp";
  const MOVING_DOWN = "movingDown";

  // initial direction
  const [direction, setDirection] = useState(MOVING_RIGHT);

  // fills an array the size of the game board with null
  const [grid, setGrid] = useState(Array(numOfSquares).fill(null));

  // array to keep track of snake length
  const [snake, setSnake] = useState(Array(1).fill(null));

  const [score, setScore] = useState(3);

  // everything needed for game start
  function startGame() {
    if (grid.indexOf(SNAKE_HEAD) === -1) {
      const startGrid = [...grid];
      appleSpawn(startGrid);
      startGrid[0] = SNAKE_HEAD;
      setGrid(startGrid);
    } else {
      alert("Game Already Started");
    }
  }

  // restores default states
  const reset = () => {
    setGrid(Array(numOfSquares).fill(null));
    setSnake(Array(1).fill(null));
    setScore(3);
    setDirection(MOVING_RIGHT);
  };

  // game over conditions
  function endConditions(fromIndex, toIndex) {
    for (var i = 0; i < boardRows; i++) {
      if (
        (fromIndex === i * boardCols - 1 && toIndex === i * boardCols) || // crosses edge going right
        (fromIndex === i * boardCols && toIndex === i * boardCols - 1) || // crosses edge going left
        toIndex > numOfSquares - 1 || // crosses edge going down
        grid[toIndex] === SNAKE_BODY || // crosses snake body
        toIndex < 0 // crosses edge going up
      ) {
        reset();
        alert("Game Over!");
        break;
      }
    }
  }

  // spawns apple in an spot
  function appleSpawn(array) {
    const randomSpawn = Math.floor(Math.random() * numOfSquares);
    if (array[randomSpawn] != null) appleSpawn(array);
    else array[randomSpawn] = APPLE;
  }

  // checks to see if an apple has been eaten
  const appleEaten = () => {
    if (grid.indexOf(APPLE) === -1) {
      appleSpawn(grid);
      const newScore = score + 3;
      setScore(newScore);
      console.log("Apple Eaten! Your New Score Is ", newScore);
    }
  };

  // maintains snake length based on score
  function maintainLength() {
    if (snake.length < score) return;
    const targetIndex = snake[0];
    snake.shift();
    grid[targetIndex] = null;
  }

  // bulk of functionality
  function autoMove() {
    // makes sure snake length coincides with score
    maintainLength();

    // checks if apple was eaten during the last interval
    appleEaten();

    const newGrid = [...grid];

    const newSnake = [...snake];

    const oldIndex = newGrid.indexOf(SNAKE_HEAD);

    // repetitive code turned into a function
    function necessaryUpdates(newIndex) {
      newSnake.push(oldIndex);
      newGrid[newIndex] = SNAKE_HEAD;
      newGrid[oldIndex] = SNAKE_BODY;
      setSnake(newSnake);
      setGrid(newGrid);
      endConditions(oldIndex, newIndex);
    }

    // makes move based on the state of direction
    if (direction === MOVING_RIGHT) {
      const newIndex = oldIndex + 1;
      necessaryUpdates(newIndex);
    } else if (direction === MOVING_LEFT) {
      const newIndex = oldIndex - 1;
      necessaryUpdates(newIndex);
    } else if (direction === MOVING_DOWN) {
      const newIndex = oldIndex + boardCols;
      necessaryUpdates(newIndex);
    } else if (direction === MOVING_UP) {
      const newIndex = oldIndex - boardCols;
      necessaryUpdates(newIndex);
    }
  }

  // interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (grid.indexOf(SNAKE_HEAD) === -1) {
        return;
      } else {
        autoMove();
      }
    }, 60);
    return () => {
      clearInterval(interval);
    };
  });

  // changes direction based on key pressed
  document.onkeydown = function changeDirection(e) {
    const keyPress = e.key;

    if (grid.indexOf(SNAKE_HEAD) === -1) return;

    switch (keyPress) {
      case "a":
        if (direction !== MOVING_RIGHT) setDirection(MOVING_LEFT);
        break;
      case "d":
        if (direction !== MOVING_LEFT) setDirection(MOVING_RIGHT);
        break;
      case "w":
        if (direction !== MOVING_DOWN) setDirection(MOVING_UP);
        break;
      case "s":
        if (direction !== MOVING_UP) setDirection(MOVING_DOWN);
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <Board squares={grid} />
      <button onClick={startGame}>Start</button>
      <p>Score: {score}</p>
    </div>
  );
};

export default Game;
