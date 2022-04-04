import { useState, useEffect } from "react";
// hook for finding window dimensions
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
  const NumOfSquares = boardRows * boardCols //determines number of squares on board based on window dimensions
  console.log(width)
console.log(boardCols)
export {useWindowDimensions, NumOfSquares, boardRows, boardCols, width, height}
