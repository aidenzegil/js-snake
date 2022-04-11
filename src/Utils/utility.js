import { useState, useEffect } from "react";

// hook for finding window dimensions
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const { width, height } = getWindowDimensions();
const boardRows = Math.floor((height * 0.8) / 20); // when using 100% of window errors occur, so i went with 80%
const boardCols = Math.floor((width * 0.8) / 20);
const numOfSquares = boardRows * boardCols; // determines number of squares on board based on rows and cols that can fit in the window

export { useWindowDimensions, numOfSquares, boardRows, boardCols };
