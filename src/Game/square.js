import React from "react";

const style = {
  width: "20px",
  height: "20px",
  border: "1px solid",
  display: "flex",
  flexWrap: "wrap",
};
const fill = {
  width: "20px",
  height: "20px",
  border: "1px solid",
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: "black",
};

const Square = ({ value }) => {
  return <div style={value ? fill : style}>{value}</div>;
};

export default Square;
