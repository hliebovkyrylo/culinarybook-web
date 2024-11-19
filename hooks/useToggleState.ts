import { useState } from "react";

type StateSetter = (id: string) => void;

export const useToggleState = (initialState: {
  [key: string]: boolean;
}): [{ [key: string]: boolean }, StateSetter] => {
  const [state, setState] = useState<{ [key: string]: boolean }>(initialState);

  const toggleState = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return [state, toggleState];
};
