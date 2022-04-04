import React from "react";

const style = {
    width: '20px',
    height: '20px',
    border: '1px solid',
    display: 'flex',
    flexWrap: 'wrap',
}

const Square = ({value}) => {
  return (
    <div style={style} className='square'>
      {value}
    </div>
  );
};

export default Square;