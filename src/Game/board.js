import Square from "./square";
import { boardCols, boardRows } from "../Utils/utility";

const container = {
  justifyContent: "center",
  display: "flex",
  flexWrap: "wrap",
};

const style = {
  width: boardCols * 22,
  height: boardRows * 22,
  border: "1px solid",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const Board = ({ squares }) => {
  return (
    <div style={container}>
      <div style={style}>
        {squares.map((square, i) => (
          <Square key={i} value={square} />
        ))}
      </div>
    </div>
  );
};

export default Board;
