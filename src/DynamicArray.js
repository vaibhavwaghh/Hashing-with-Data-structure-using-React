import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

export function DynamicArray({ boxes }, { isBlinking }) {
  // console.log(isBlinking);
  const secondElementRef = useRef(null);
  const l = 6;

  useEffect(() => {
    if (secondElementRef.current) {
      const leftPosition =
        secondElementRef.current.getBoundingClientRect().left;
    }
  }, []);
  return (
    <div className="box-container">
      {boxes.map((value, index) => (
        <div
          ref={index === l ? secondElementRef : null}
          key={index}
          id="box"
          className={`box ${isBlinking ? "blink" : ""}`}
        >
          <p className="nn"> {value}</p>
          <p className="mm">{index}</p>
        </div>
      ))}
      {/* <button onClick={handleBlink}>insert</button> */}
    </div>
  );
}
