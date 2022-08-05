import Square from "./square";
import { boardCols, boardRows } from "../Utils/utility";

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
    <div className="boardContainer">
      <div style={style}>
        {squares.map((square, i) => (
          <Square key={i} value={square} />
        ))}
      </div>
    </div>
  );
};

export default Board;
