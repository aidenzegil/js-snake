import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


  const {width, height} = getWindowDimensions()
  const boardRows = Math.floor((height * .9)/20)
  const boardCols = Math.floor((width * .9)/20)
  const NumOfSquares = boardRows * boardCols
  console.log(width)
console.log(boardCols)
export {useWindowDimensions, NumOfSquares, boardRows, boardCols, width, height}
