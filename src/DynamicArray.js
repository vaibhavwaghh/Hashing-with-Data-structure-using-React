import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { PositionContext } from "./index";

export function DynamicArray({
  boxes,
  isBlinking,
  setIsBlinking,
  collidedHashValue,
  searchedHashValue,
  deletedHashValue,
}) {
  const { leftPosition, setLeftPosition, setTopPosition, topPosition, k } =
    React.useContext(PositionContext);

  useEffect(() => {
    if (isBlinking) {
      const blinkTimer = setTimeout(() => {
        setIsBlinking(false);
      }, 1000); // Blink for 1 second
      return () => clearTimeout(blinkTimer);
    }
  }, [isBlinking, setIsBlinking]);

  const insertedarray = boxes.map((item) => Number(item));
  const collidedArray = collidedHashValue.map((item) => Number(item));
  const deledArray = deletedHashValue.map((item) => Number(item));
  const searchedArray = searchedHashValue.map((item) => Number(item));

  const secondElementRef = useRef(null);
  useEffect(() => {
    if (secondElementRef.current) {
      setLeftPosition(secondElementRef.current.getBoundingClientRect().left);
      setTopPosition(secondElementRef.current.getBoundingClientRect().top);
    }
  }, [k, setLeftPosition, setTopPosition]);

  return (
    <div className="box-container">
      {boxes.map((value, index) => {
        let highlightcolor;
        let highlight = false;
        if (insertedarray[index] !== -1) {
          highlight = true;
        }
        const highlight1 = collidedArray.includes(index);
        const highlight2 = searchedArray.includes(index);
        const highlight3 = deledArray.includes(index);
        if (highlight2 && isBlinking) {
          highlightcolor = "aqua";
        } else if (highlight3 && isBlinking) {
          highlightcolor = "yellow";
        } else if (highlight1) {
          highlightcolor = "green";
        } else if (highlight) {
          highlightcolor = "red";
        } else {
          highlightcolor = "blue";
        }

        return (
          <div
            key={index}
            ref={index === k ? secondElementRef : null}
            className="box"
            style={{ backgroundColor: highlightcolor }}
          >
            <p className="nn">{value}</p>
            <p className="mm">{index}</p>
          </div>
        );
      })}
    </div>
  );
}

DynamicArray.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  isBlinking: PropTypes.bool.isRequired,
  setIsBlinking: PropTypes.func.isRequired,
  collidedHashValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  searchedHashValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  deletedHashValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};
