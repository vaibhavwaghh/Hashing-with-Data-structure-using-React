import React, { createContext, useContext, useState } from "react";
import { PositionContext } from "./index";
export function Div({ key1 }) {
  const { leftPosition } = React.useContext(PositionContext);
  const [left, setleft] = useState([]);

  console.log(leftPosition);
  const val = leftPosition + "px";
  const fontvalue = "1.9rem";
  const componentstyle = {
    height: "90px",
    border: "2px solid black",
    width: "110px",
    position: "relative",
    top: `75px`,
    left: val,
    textAlign: "center",
    alignItems: "center",
    fontSize: fontvalue,
    backgroundColor: "green",
  };
  return (
    <>
      <div className="new-container">
        <div style={componentstyle} className="boxxx">
          <span className="arrow">↓</span>
          <p className="nnnn"> {key1}</p>
        </div>
      </div>
    </>
  );
}
