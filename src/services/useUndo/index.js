import { useState, useEffect } from "react";

function useUndo(initialState) {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([initialState]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const cooldownPeriod = 150; // Set the cooldown period

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
      setLastClickTime(new Date().getTime());
    }
  };

  const undo = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < cooldownPeriod) {
      return;
    }

    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setLastClickTime(currentTime);
    }
  };

  const redo = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < cooldownPeriod) {
      return;
    }

    if (historyIndex < history.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setLastClickTime(currentTime);
    }
  };

  useEffect(() => {
    setState(history[historyIndex]);
  }, [historyIndex, history]);

  return [state, setColors, undo, redo, history, historyIndex];
}

export default useUndo;
