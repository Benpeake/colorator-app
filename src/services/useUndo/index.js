import { useState, useEffect } from "react";

function useUndo(initialState) {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([initialState]);
  const [index, setIndex] = useState(0);

  const setColors = (newState, recordHistory = true) => {
    if (newState !== state) {
      setHistory((prevHistory) =>
        recordHistory
          ? [...prevHistory.slice(0, index + 1), newState]
          : prevHistory
      );
      setIndex((newIndex) => (recordHistory ? newIndex + 1 : newIndex));
      setState(newState);
    }
  };

  const undo = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const redo = () => {
    if (index < history.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    setState(history[index]);
  }, [index, history]);

  return [state, setColors, undo, redo];
}

export default useUndo;
