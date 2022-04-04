import Square from "./square";
import {useWindowDimensions} from '../Utils/utility'

const {width, height} = useWindowDimensions

const container = {
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
}

const style = {
    width: ((useWindowDimensions.width) * 0.9),
    height: ((useWindowDimensions.height) * 0.9),
    border: '1px solid',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
}

// const boardRows = width / 20
// const boardCols = height / 20

const Board = ({ squares }) => {

return(
    <div style = {container}>
    <div style={style}>
    {squares.map((square, i) => (
      <Square key={i} value={square} />
    ))}
  </div>
  </div>
)};

export default Board;
