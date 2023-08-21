import React, { createContext, useContext } from "react";

export function Div({ key1, leftPosition }) {
  console.log(leftPosition);
  const val = 529.2000122070312 + "px";
  const fontvalue = "1.9rem";
  const componentstyle = {
    height: "90px",
    backgroundColor: "white",
    border: "2px solid black",
    width: "110px",
    display: "flex",
    position: "relative",
    top: `75px`,
    left: val,
    textAlign: "centre",
    flexDirection: "column",
    alignItems: "center",
    fontSize: fontvalue,
    backgroundColor: "blue",
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
