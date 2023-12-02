import { useEffect, useState } from "react";
import "./panel.css";
import { useDrag, useDrop } from "react-dnd";
import { HexColorPicker, HexColorInput } from "react-colorful";

function Panel({
  color,
  index,
  handleMoveColor,
  removeColorPanel,
  handleLockStatus,
  updateColor,
  tempUpdateColor,
  name,
  fontColor
}) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [preColorPickerValue, setPreColorPickerValue] = useState("");
  const [inputHex, setInputHex] = useState(color);

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

  function triggerColorPicker() {
    setPreColorPickerValue(color);
    setDisplayColorPicker(true);
  }

  function closeColorPicker() {
    tempUpdateColor(index, preColorPickerValue);
    setDisplayColorPicker(false);
  }

  function confirmColorPickerChange() {
    updateColor(index, color);
    setDisplayColorPicker(false);
  }

  function setfontColor(fontColor){
    if(fontColor == '#000000'){
      return 'black'
    }
    return 'white'
  }
  return (
    <>
      <section
        ref={(panel) => {
          drag(drop(panel));
        }}
        className={`panel ${setfontColor(fontColor)}`}
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
              src={`../../../icons/close_${setfontColor(fontColor)}.svg`}
              alt="close icon"
            />
          </div>
          <div className="panel-icon-container" onClick={handleCopyColor}>
            <img
              className="panel-icon"
              src={`../../../icons/copy_${setfontColor(fontColor)}.svg`}
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
              src={`../../../icons/open_${setfontColor(fontColor)}.svg`}
              alt="locked status open icon"
            />
          </div>
          <div className="panel-icon-container move">
            <img
              className="panel-icon"
              src={`../../../icons/move_${setfontColor(fontColor)}.svg`}
              alt="move panel icon"
            />
          </div>
          <div className="panel-icon-container" onClick={triggerColorPicker}>
            <p className="med-copy">{color}</p>
          </div>
        </div>
        <div className="panel-name" onClick={triggerColorPicker}>
          <p className="small-copy">{name}</p>
        </div>
      </section>
      {displayColorPicker && (
        <div className="color-picker-overlay">
          <div className="color-picker">
            <div>
              <HexColorPicker
                color={inputHex}
                onChange={(newColor) => {
                  setInputHex(newColor);
                }}
                onMouseUp={() => {
                  tempUpdateColor(index, inputHex);
                }}
              />
            </div>
            <div>
              <HexColorInput
                className="custom-hex-input"
                color={inputHex}
                onChange={(newColor) => {
                  setInputHex(newColor);
                }}
                onBlur={() => {
                  tempUpdateColor(index, inputHex);
                }}
              />
            </div>
            <div className="color-picker-controlls">
              <div
                className="panel-icon-container"
                onClick={confirmColorPickerChange}
              >
                <img
                  className="panel-icon"
                  src="../../../icons/tick_white.svg"
                  alt="move panel icon"
                />
              </div>
              <div className="panel-icon-container" onClick={closeColorPicker}>
                <img
                  className="panel-icon"
                  src="../../../icons/close_white.svg"
                  alt="move panel icon"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Panel;
