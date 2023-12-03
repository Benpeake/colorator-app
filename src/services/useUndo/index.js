import { useState, useEffect } from "react";

function useUndo(initialState) {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([initialState]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const setColors = (newState, recordHistory = true) => {
    if (newState !== state) {
      setHistory((prevHistory) =>
        recordHistory
          ? [...prevHistory.slice(0, historyIndex + 1), newState]
          : prevHistory
      );
      setHistoryIndex((newHistoryIndex) =>
        recordHistory ? newHistoryIndex + 1 : newHistoryIndex
      );
      setState(newState);
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    setState(history[historyIndex]);
  }, [historyIndex, history]);

  return [state, setColors, undo, redo, history, historyIndex];
}

export default useUndo;
