import { useEffect, useRef, useState } from "react";
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
  setDisplaySignUp,
  token,
  setShowSpaceTip,
  setShowUndoRedoTip,
}) {
  const [maxPanelNum, setMaxPanelNum] = useState(true);
  const [undoActive, setUndoActive] = useState(false);
  const [redoActive, setRedoActive] = useState(false);
  const [generateIsHovered, setGenerateIsHovered] = useState(false)
  const isSpaceBarDown = useRef(false);
  const undoRedoCooldown = useRef(false);

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

  const handleKeyDown = (event) => {
    if (colors && generateRandomColor) {
      if (event.keyCode === 32 && !isSpaceBarDown.current) {
        // Spacebar is pressed
        isSpaceBarDown.current = true;
        setTimeout(() => {
          generateRandomColor();
          setShowSpaceTip(false);
          setTimeout(() => {
            setShowUndoRedoTip(true);
          }, 1000);
        }, 100)
      }
      // Check for Command (Meta key on Mac, Ctrl on Windows/Linux) and 'z' for undo
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault(); // Prevents browser default behavior for undo (e.g., page navigation)
        if (event.shiftKey) {
          // Check for Command, Shift, and 'z' for redo
          if (!undoRedoCooldown.current) {
            redo();
            setShowUndoRedoTip(false)
            undoRedoCooldown.current = true;
            setTimeout(() => {
              undoRedoCooldown.current = false;
            }, 100); // cooldown 
          }
        } else {
          // Just Command and 'z' for undo
          if (!undoRedoCooldown.current) {
            undo();
            setShowUndoRedoTip(false)
            undoRedoCooldown.current = true;
            setTimeout(() => {
              undoRedoCooldown.current = false;
            }, 100); // cooldown
          }
        }
      }
    }
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 32) {
      isSpaceBarDown.current = false;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [colors, generateRandomColor]);


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [colors, generateRandomColor]);

  return (
    <section className="controller-contrainer">
      <div className="controller-left">
        <div
          className={`panel-icon-container icon-container ${maxPanelNum ? "" : "unnactive"}`}
          onClick={addColorPanel}
        >
          <img
            className="icon"
            src="../../../icons/plus_black.svg"
            alt="add panel icon"
          />
          <p className="small-copy">Panel</p>
        </div>
        <div className="panel-icon-container icon-container">
          <img
            className="icon"
            src="../../../icons/like_black.svg"
            alt="save icon"
          />
          {token ? (
            <p
              className="small-copy"
              onClick={() => {
                setDisplayAddPalette(true);
              }}
            >
              Save
            </p>
          ) : (
            <p
              className="small-copy"
              onClick={() => {
                setDisplaySignUp(true);
              }}
            >
              Save
            </p>
          )}
        </div>
        <div
          className={` panel-icon-container icon-container ${undoActive ? "" : "unnactive"}`}
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
          className={` panel-icon-container icon-container ${redoActive ? "" : "unnactive"}`}
          onClick={redo}
        >
          <img
            className="icon"
            src="../../../icons/redo_black.svg"
            alt="redo icon"
          />
          <p className="small-copy">Redo</p>
        </div>
        <div 
          className="panel-icon-container icon-container"
          onClick={generateRandomColor}
          onMouseEnter={() => setGenerateIsHovered(true)}
          onMouseLeave={() => setGenerateIsHovered(false)}
        >
          <img
            className={`icon`}
            src="../../../icons/change.svg"
            alt="generate icon"
          />
          <p className="small-copy">Generate</p>
        </div>
      </div>
      <div className="controller-right"></div>
    </section>
  );
}

export default Controller;
