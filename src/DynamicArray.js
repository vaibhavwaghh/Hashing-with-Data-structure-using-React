import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

export function DynamicArray({
  boxes,
  isBlinking,

  setIsBlinking,
  array,
  leftPosition,
  setLeftPosition,
  insertedHashValue,
  collidedHashValue,
  searchedHashValue,
  deletedHashValue,
  key1,
  key2,
}) {
  const secondElementRef = useRef(null);
  useEffect(() => {
    if (secondElementRef.current) {
      setLeftPosition(secondElementRef.current.getBoundingClientRect().left);
      console.log(leftPosition);
    }
  }, []);
  // var l = k;
  // if (isBlinking) {
  //   setBlink(true);
  // }
  // if (array) {
  //   setk(array[0]);
  //   setk(array[1]);
  // }
  // conso le.log(k);
  // console.log(array);
  useEffect(() => {
    if (isBlinking) {
      const blinkTimer = setTimeout(() => {
        setIsBlinking(false);
      }, 1000); // Blink for 1 second
      return () => clearTimeout(blinkTimer);
    }
  }, [isBlinking]);

  //   return (
  //     <div className="box-container">
  //       {boxes.map((value, index) => {

  //    return(
  //         <div
  //           ref={index === k ? secondElementRef : null}
  //           key={index}
  //           id="box"
  //           className={`box ${index == k && isBlinking ? "blink" : ""}`}
  //         >
  //           <p className="nn"> {value}</p>
  //           <p className="mm">{index}</p>
  //         </div>
  //    );
  //     )}}
  //    </div>
  //   );
  // }
  // const [positionsToHighlight, setpositionsToHighlight] = useState([]);
  // const updadedElement = [...insertedElement];
  // setpositionsToHighlight(updadedElement);
  // var collidedArray = [];

  var deledArray = [];
  var searchedArray = [];
  const insertedarray = boxes.map((item, i) => Number(item));

  const collidedArray = collidedHashValue.map((item, i) => Number(item));
  deledArray = deletedHashValue.map((item, i) => Number(item));
  searchedArray = searchedHashValue.map((item, i) => Number(item));

  // if (deledArray.length === 0) {
  //   console.log(searchedArray);
  // }

  // console.log(searchedArray);
  // console.log(deledArray);
  // console.log(boxes );
  // console.log(searchedArray, positionsToHighlight3);
  return (
    <div className="box-container">
      {boxes.map((value, index) => {
        let highlightcolor;
        var highlight = false;
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
          <div key={index} id="box" style={{ backgroundColor: highlightcolor }}>
            <p className="nn">{value}</p>
            <p className="mm">{index}</p>
          </div>
        );
      })}
    </div>
  );
  searchedArray = [];
}
