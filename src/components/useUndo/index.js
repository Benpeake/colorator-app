import { useState } from "react";

function useUndo(initialState) {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([initialState]);
  const [index, setIndex] = useState(0);

  const setUndoableState = (newState) => {
    const newHistory = [...history.slice(0, index + 1), newState];
    setHistory(newHistory);
    setIndex(newHistory.length - 1);
    setState(newState);
  };

  function undo() {
    if (index > 0) {
      setIndex(index - 1);
      setState(history[index - 1]);
    }
  };

  function redo() {
    if (index < history.length - 1) {
      setIndex(index + 1);
      setState(history[index + 1]);
    }
  };

  return [state, setUndoableState, undo, redo];
}

export default useUndo;
