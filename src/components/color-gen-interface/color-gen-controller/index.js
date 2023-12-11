import { useEffect, useState } from "react";
import "./controller.css";

function Controller({
  colors,
  generateRandomColor,
  undo,
  redo,
  addColorPanel,
  history,
  historyIndex,
  setDisplayAddPalette,
}) {
  const [maxPanelNum, setMaxPanelNum] = useState(true);
  const [undoActive, setUndoActive] = useState(false);
  const [redoActive, setRedoActive] = useState(false);

  useEffect(() => {
    if (colors.length > 4) {
      setMaxPanelNum(false);
    } else {
      setMaxPanelNum(true);
    }
    if (historyIndex > 0) {
      setUndoActive(true);
    } else {
      setUndoActive(false);
    }
    if (historyIndex < history.length - 1) {
      setRedoActive(true);
    } else {
      setRedoActive(false);
    }
  }, [colors]);

  return (
    <section className="controller-contrainer">
      <div className="controller-left">
        <div
          className={`icon-container ${maxPanelNum ? "" : "unnactive"}`}
          onClick={addColorPanel}
        >
          <img
            className="icon"
            src="../../../icons/plus_black.svg"
            alt="add panel icon"
          />
          <p className="small-copy">Panel</p>
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="../../../icons/like_black.svg"
            alt="save icon"
          />
          <p
            className="small-copy"
            onClick={() => {
              setDisplayAddPalette(true);
              console.log('click')
            }}
          >
            Save
          </p>
        </div>
        <div
          className={`icon-container ${undoActive ? "" : "unnactive"}`}
          onClick={undo}
        >
          <img
            className="icon"
            src="../../../icons/undo_black.svg"
            alt="undo icon"
          />
          <p className="small-copy">Undo</p>
        </div>
        <div
          className={`icon-container ${redoActive ? "" : "unnactive"}`}
          onClick={redo}
        >
          <img
            className="icon"
            src="../../../icons/redo_black.svg"
            alt="redo icon"
          />
          <p className="small-copy">Redo</p>
        </div>
        <div className="icon-container">
          <p className="small-copy">|</p>
        </div>
        <div className="icon-container" onClick={generateRandomColor}>
          <img
            className="icon"
            src="../../../icons/boom_black.svg"
            alt="generate icon"
          />
          <p className="small-copy">Generate!</p>
        </div>
      </div>
      <div className="controller-right"></div>
    </section>
  );
}

export default Controller;
