import React, { createContext, useContext, useState } from "react";
import { PositionContext } from "./index";

export function Div({ key1 }) {
  const { leftPosition, topPosition } = React.useContext(PositionContext);
  const [leftPosition1, setLeftPosition1] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bottomPosition1, setBottomPosition1] = useState([]);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  console.log(topPosition);
  // Add the current leftPosition value to leftPosition1 array
  React.useEffect(() => {
    setLeftPosition1((prevLeftPosition1) => [
      ...prevLeftPosition1,
      leftPosition,
    ]);
  }, [leftPosition]);
  React.useEffect(() => {
    setBottomPosition1((prevBottomPosition1) => [
      ...prevBottomPosition1,
      topPosition,
    ]);
  }, [topPosition]);

  const val1 = leftPosition1[(currentIndex % leftPosition1.length) + 1] + "px";
  const val2 =
    bottomPosition1[(currentIndex % bottomPosition1.length) + 1] - 230 + "px";
  const fontvalue = "1.9rem";
  const componentstyle = {
    height: "90px",
    border: "2px solid black",
    width: "110px",
    position: "relative",
    left: val1,
    top: val2,
    textAlign: "center",
    alignItems: "center",
    fontSize: fontvalue,
    backgroundColor: "green",
  };

  // Increment the currentIndex for the next execution
  // const handleNextPosition = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % leftPosition1.length);
  // };
  // console.log(leftPosition, leftPosition1, currentIndex);
  return (
    <>
      <div style={componentstyle} className="boxxx">
        <span className="arrow">↓</span>
        <p className="nnnn"> {key1}</p>
      </div>
    </>
  );
}
