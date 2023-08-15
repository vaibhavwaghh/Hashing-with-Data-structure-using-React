import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import ReactDOM from "react-dom/client";
import "./Boxcontainer.css";
import { Div } from "./Div.js";
import { DynamicArray } from "./DynamicArray";

function MainComponent() {
  const [hashingFunctionName, sethashingFunctionName] = useState(false);
  const [collisionResolution, setCollisionResolution] = useState(false);
  const [key, setKey] = useState(false);
  const [key1, setKey1] = useState(false);
  const [key2, setKey2] = useState(false);
  const [numBoxes, setNumBoxes] = useState(false);
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState(false);
  const [boxes1, setMyBoxes1] = useState([]);
  const [explain, setExplain] = useState(false);
  const [boxes, setMyBoxes] = useState([]);
  const [code, setcode] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const handleBlink = () => {
    // Set the blinking duration (milliseconds)
  };
  function vpw1(e) {
    setExplain(false);

    sethashingFunctionName(e.target.value);
    setVisible(false);
  }
  function vpw2(e) {
    setExplain(false);

    setCollisionResolution(e.target.value);
    setVisible(false);
  }

  function vpw3(e) {
    setExplain(false);

    setSize(e.target.value);
    const value = parseInt(e.target.value);

    setNumBoxes(value);
    setVisible(false);
  }
  function vpw4(e) {
    setKey(e.target.value);

    setExplain(false);
  }
  function vpw41(e) {
    setExplain(false);

    setKey1(e.target.value);
  }
  function vpw42(e) {
    setExplain(false);

    setKey2(e.target.value);
  }

  function handleSubmit(value) {
    setIsBlinking(true);
    // setTimeout(() => {
    //   setIsBlinking(false);
    // }, 1000);
    setExplain(`Size of the Array is ${value}`);
    setcode(` setMyBoxes(Array(value).fill(-1))
    `);
    if (
      hashingFunctionName === "Select a hashing function" ||
      collisionResolution === "Select a collision resolution technique," ||
      size === "Choose table size"
    ) {
      setVisible(false);
    } else {
      setMyBoxes(Array(value).fill(-1));
      setVisible(true);
    }
  }
  console.log(isBlinking);
  function updateBox() {
    handleInsert1();
  }
  function findKeyIndices(arr, keys) {
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
      if (keys.includes(arr[i])) {
        indices.push(i);
      }
    }
    return indices;
  }
  function updateBox1() {
    let arr = findKeyIndices(boxes, key1);
    if (arr.length === 0) {
      setExplain(`Key not found `);
    } else {
      setExplain(`Key  found at position ${arr.join(",")}`);
    }
  }
  function updateBox2() {
    let arr = findKeyIndices(boxes, key2);
    if (arr.length === 0) {
      setExplain(`Key not found `);
    } else {
      setExplain(`Deleted keys were found at position ${arr.join(",")}`);

      const updatedBoxes = [...boxes];
      for (let i = 0; i < arr.length; i++) {
        updatedBoxes[arr[i]] = -1;
      }
      setMyBoxes(updatedBoxes);
    }
  }

  function handleCollision(hashValue) {
    const updatedBoxes = [...boxes];

    if (updatedBoxes[hashValue] === -1) {
      updatedBoxes[hashValue] = key;
      setMyBoxes(updatedBoxes);
    } else {
      if (collisionResolution === "Linear probing") {
        while (updatedBoxes[hashValue] !== -1) {
          if (hashValue <= size) {
            hashValue++;
          } else {
            setExplain("CANNOT INSERT");
            break;
          }
        }
        if (hashValue <= size) {
          setExplain(
            ` In Linear probing the algorithm simply looks for the next available slot in the hash table and places the collided key there\n Here the new hash value=${hashValue} `
          );
          console.log(hashValue);
          alert("COLLISION HAS OCCURED");

          updatedBoxes[hashValue] = key;
          setMyBoxes(updatedBoxes);
        }
      } else if (collisionResolution === "Quadratic probing") {
        let step = 0;
        let m = hashValue;
        while (updatedBoxes[hashValue] !== -1) {
          if (updatedBoxes.includes(-1)) {
            if (hashValue <= size) {
              step++;

              hashValue = (m + step * step) % size;
              console.log(hashValue);
              setExplain(`In quadratic probing If the slot hash(x) % S is full, then we try (hash(x) + 1*1) % S.
If (hash(x) + 1*1) % S is also full, then we try (hash(x) + 2*2) % S.
If (hash(x) + 2*2) % S is also full, then we try (hash(x) + 3*3) % S.
This process is repeated for all the values of i until an empty slot is found.In this case new hash value is ${hashValue}`);
            }
          } else {
            setExplain("CANNOT INSERT");

            break;
          }
        }
        if (hashValue <= size && updatedBoxes.includes(-1)) {
          alert("COLLISION HAS OCCURED");

          updatedBoxes[hashValue] = key;
          setMyBoxes(updatedBoxes);
        }
      } else if (collisionResolution === "Double hashing") {
        let prime = size - 3,
          i = 1;
        let firstHashingFunction, secondhashingFunction, newhashValue;
        firstHashingFunction = hashValue;
        secondhashingFunction = prime - (key % prime);
        newhashValue =
          (firstHashingFunction + i * secondhashingFunction) % size;

        if (updatedBoxes[newhashValue] !== -1) {
          while (updatedBoxes[newhashValue] !== -1) {
            if (updatedBoxes.includes(-1)) {
              if (newhashValue <= size) {
                i++;
                newhashValue =
                  (firstHashingFunction + i * secondhashingFunction) % size;
              }
            } else {
              setExplain("CANNOT INSERT");
              break;
            }
          }
        }
        if (newhashValue <= size) {
          alert("COLLISION HAS OCCURED");
          console.log(newhashValue);
          updatedBoxes[newhashValue] = key;
          setMyBoxes(updatedBoxes);
          setExplain(
            ` Double hashing is a collision resolution technique used in hash tables. It works by using two hash functions to compute two different hash values for a given key. The first hash function is used to compute the initial hash value, and the second hash function is used to compute the step size for the probing sequence.
            \n Here the new hash value is ${newhashValue}`
          );
        }
      } else if (collisionResolution === "Open hashing") {
        alert("COLLISION HAS OCCURED");
        var k = parseInt(hashValue);

        const newDiv = <Div key1={key} />;
        setMyBoxes1([...boxes1, newDiv]);
      }
    }
  }

  function handleInsert1() {
    if (hashingFunctionName === "Direct Hashing") {
      return directHashing(key);
    } else if (hashingFunctionName === "Folding method") {
      return folding(key, size);
    } else if (hashingFunctionName === "Multiplication method") {
      return multiplication(key, size);
    } else if (hashingFunctionName === "Modulo division") {
      return moduloDivision(key, size);
    } else if (hashingFunctionName === "Mid-square Multiplication") {
      return midSquare(key);
    }
  }

  function directHashing(key) {
    let hashValue;
    hashValue = key;
    if (hashValue <= numBoxes) {
      setExplain(
        `In Direct hashing technique, the hashValue is calculated using formula, hashvalue = key. \nIn this case  the hash value is ${hashValue}  `
      );
      setcode(``);
      handleCollision(hashValue);
    } else {
      setExplain("CANNOT INSERT");
    }
  }

  function moduloDivision(key, size) {
    let hashValue = key % size;

    if (hashValue <= numBoxes) {
      setExplain(
        `In Modulo Division technique, hashvalue is calculated using formula, hashValue = key % size
        . In this case the hashvalue = ${hashValue}`
      );
      handleCollision(hashValue);
    } else {
      setExplain("CANNOT INSERT");
    }
  }
  function multiplication(key, size) {
    let hashValue = Math.floor(size * ((key * 0.618033) % 1));

    if (hashValue <= numBoxes) {
      setExplain(
        `In multiplication method, hashvalue is calculated using formula, h(K) = floor (M (kA mod 1))
        . In this case the hashvalue=${hashValue}`
      );
      handleCollision(hashValue);
    } else {
      setExplain("CANNOT INSERT");
    }
  }
  function midSquare(key) {
    let keySquare = key * key;
    const numberString = keySquare.toString();
    const middleIndex = Math.floor(numberString.length / 2);
    const middle =
      numberString.length % 2 === 0
        ? numberString.slice(middleIndex - 1, middleIndex + 1)
        : numberString.slice(middleIndex, middleIndex + 1);
    let hashValue = middle;

    if (hashValue <= numBoxes) {
      setExplain(`In Mid square technique, hashvalue is calculated using formula, h(K) = h(k x k)
      . In this case the hashvalue = ${hashValue}`);
      handleCollision(hashValue);
    } else {
      setExplain("CANNOT INSERT");
    }
  }

  function folding(key, size) {
    let keyString = key.toString();
    if (keyString.length === 10) {
      let a = Number(keyString.slice(0, 5));
      let b1 = keyString.slice(5, 10);
      let b2 = keyString.slice(10);
      let b = Number(b1 + b2);
      let hashValue = (a + b) % size;

      if (hashValue <= numBoxes) {
        const updatedBoxes = [...boxes];
        updatedBoxes[hashValue] = key;
        setMyBoxes(updatedBoxes);
        setExplain(
          `In Folding technique, hashvalue is calculated using formula, hashValue = k = k1, k2, k3, k4, ….., kn
s = k1+ k2 + k3 + k4 +….+ kn
h(K)= s
        . In this case the hashvalue = ${hashValue}`
        );
      } else {
        setExplain("CANNOT INSERT");
      }
    } else if (keyString.length === 9) {
      let a = Number(keyString.slice(0, 3));
      let b = Number(keyString.slice(3, 6));
      let c1 = keyString.slice(6, 9);
      let c2 = keyString.slice(9);
      let c = Number(c1 + c2);
      let hashValue = (a + b + c) % size;

      if (hashValue <= numBoxes) {
        const updatedBoxes = [...boxes];
        updatedBoxes[hashValue] = key;
        setMyBoxes(updatedBoxes);
        setExplain(
          `In Folding technique, hashvalue is calculated using formula, hashValue = k = k1, k2, k3, k4, ….., kn
s = k1+ k2 + k3 + k4 +….+ kn
h(K)= s
        . In this case the hashvalue = ${hashValue}`
        );
      } else {
        setExplain("CANNOT INSERT");
      }
    } else if (keyString.length === 8) {
      let a = Number(keyString.slice(0, 4));
      let b1 = keyString.slice(4, 8);
      let b2 = keyString.slice(8);
      let b = Number(b1 + b2);
      let hashValue = (a + b) % size;

      if (hashValue <= numBoxes) {
        const updatedBoxes = [...boxes];
        updatedBoxes[hashValue] = key;
        setMyBoxes(updatedBoxes);
        setExplain(
          `In Folding technique, hashvalue is calculated using formula, hashValue = k = k1, k2, k3, k4, ….., kn
s = k1+ k2 + k3 + k4 +….+ kn h(K)= s  . In this case the hashvalue = ${hashValue}`
        );
      } else {
        setExplain("CANNOT INSERT");
      }
    } else if (keyString.length === 6) {
      let a = Number(keyString.slice(0, 3));
      let b1 = keyString.slice(3, 6);
      let b2 = keyString.slice(6);
      let b = Number(b1 + b2);
      let hashValue = (a + b) % size;

      if (hashValue <= numBoxes) {
        const updatedBoxes = [...boxes];
        updatedBoxes[hashValue] = key;
        setMyBoxes(updatedBoxes);
        setExplain(
          `In Folding technique, hashvalue is calculated using formula, hashValue = k = k1, k2, k3, k4, ….., kn
s = k1+ k2 + k3 + k4 +….+ kn
h(K)= s
        . In this case the hashvalue = ${hashValue}`
        );
      } else {
        setExplain("CANNOT INSERT");
      }
    } else if (keyString.length === 4) {
      let a = Number(keyString.slice(0, 2));
      let b1 = keyString.slice(2, 4);
      let b2 = keyString.slice(4);
      let b = Number(b1 + b2);
      let hashValue = (a + b) % size;

      if (hashValue <= numBoxes) {
        const updatedBoxes = [...boxes];
        updatedBoxes[hashValue] = key;
        setMyBoxes(updatedBoxes);
        setExplain(
          `In Folding technique, hashvalue is calculated using formula, hashValue = k = k1, k2, k3, k4, ….., kn
s = k1+ k2 + k3 + k4 +….+ kn
h(K)= s
        . In this case the hashvalue = ${hashValue}`
        );
      } else {
        setExplain("CANNOT INSERT");
      }
    } else if (keyString.length === 2) {
      let a = Number(keyString.slice(0, 1));
      let b1 = keyString.slice(1, 2);
      let b2 = keyString.slice(2);
      let b = Number(b1 + b2);
      let hashValue = (a + b) % size;

      if (hashValue <= numBoxes) {
        const updatedBoxes = [...boxes];
        updatedBoxes[hashValue] = key;
        setMyBoxes(updatedBoxes);
        setExplain(
          `In Folding technique, hashvalue is calculated using formula, hashValue = k = k1, k2, k3, k4, ….., kn
s = k1+ k2 + k3 + k4 +….+ kn
h(K)= s
        . In this case the hashvalue = ${hashValue}`
        );
      } else {
        setExplain("CANNOT INSERT");
      }
    } else {
      setExplain("Folding not possible");
    }
  }

  return (
    <>
      <div className="container">
        <select value={hashingFunctionName} onChange={vpw1} name="" id="k1">
          <option>Select a hashing function </option>
          <option>Direct Hashing</option>
          <option>Multiplication method</option>
          <option>Modulo division</option>
          <option>Mid-square Multiplication</option>
          <option>Folding method</option>
        </select>
        <select value={collisionResolution} onChange={vpw2} name="" id="k2">
          <option>Select a collision resolution technique,</option>
          <option>Linear probing</option>
          <option>Quadratic probing</option>
          <option>Double hashing</option>
          <option>Open hashing</option>
        </select>
        <select value={size} onChange={vpw3} name="" id="k3">
          <option>Choose table size</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
        </select>
        <button onClick={() => handleSubmit(numBoxes)} className="button-1">
          SUBMIT
        </button>
        <div className="large-container">
          {visible && (
            <div className="container-2">
              <input
                placeholder="Enter any number"
                className="user-input-1"
                type="text"
                onChange={vpw4}
              />
              <button onClick={updateBox} className="button-2">
                INSERT
              </button>
            </div>
          )}
          {visible && (
            <div className="container-2">
              <input
                placeholder="Enter any number"
                className="user-input-1"
                type="text"
                onChange={vpw41}
              />
              <button onClick={updateBox1} className="button-2">
                SEARCH
              </button>
            </div>
          )}
          {visible && (
            <div className="container-2">
              <input
                placeholder="Enter any number"
                className="user-input-1"
                type="text"
                onChange={vpw42}
              />
              <button onClick={updateBox2} className="button-2">
                DELETE
              </button>
            </div>
          )}
        </div>{" "}
      </div>
      {visible && <DynamicArray boxes={boxes} isBlinking={isBlinking} />}

      {visible && <div className="box-containerr">{boxes1}</div>}
      {visible && (
        <div className="conttt">
          {" "}
          <div className="explain">
            <p>EXPLAINATION :-</p>

            <p className="ee">{explain}</p>
          </div>
          <div className="explain">
            <p>CODE :-</p>

            <p className="ee">{code}</p>
          </div>
        </div>
      )}
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainComponent />);
