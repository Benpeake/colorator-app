import { useState } from "react";
import "./panel.css";
import { useDrag, useDrop } from "react-dnd";

function Panel({
  colors,
  color,
  index,
  handleMoveColor,
  removeColorPanel,
  handleLockStatus,
}) {
  const [copySuccess, setCopySuccess] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "COLOR_PANEL",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "COLOR_PANEL",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        handleMoveColor(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  function handleCopyColor() {
    try {
      navigator.clipboard.writeText(color).then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1500);
      });
    } catch (err) {
      console.error("Copy to clipboard failed:", err);
    }
  }

  return (
    <section
      ref={(panel) => {
        drag(drop(panel));
      }}
      className="panel"
      style={{ backgroundColor: color, opacity: isDragging ? 0 : 1 }}
    >
      <div className="panel-info-container">
        <div
          className="panel-icon-container"
          onClick={() => {
            removeColorPanel(index);
          }}
        >
          <img
            className="panel-icon"
            src="../../../icons/close_black.svg"
            alt="close icon"
          />
        </div>
        <div className="panel-icon-container" onClick={handleCopyColor}>
          <img
            className="panel-icon"
            src="../../../icons/copy_black.svg"
            alt="copy icon"
          />
        </div>
        <div
          className="panel-icon-container"
          onClick={() => {
            handleLockStatus(index);
          }}
        >
          <img
            className="panel-icon"
            src="../../../icons/open_black.svg"
            alt="locked status open icon"
          />
        </div>
        <div className="panel-icon-container">
          <p className="med-copy">{color}</p>
        </div>
      </div>
    </section>
  );
}

export default Panel;
