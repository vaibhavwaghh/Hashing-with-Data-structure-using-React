import { createContext, useContext } from "react";
const PositionContext = createContext();
export function usePosition() {
  return useContext(PositionContext);
}
export default PositionContext;
