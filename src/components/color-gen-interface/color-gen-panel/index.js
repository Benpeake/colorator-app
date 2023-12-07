import { useEffect, useState } from "react";
import "./panel.css";
import { useDrag, useDrop } from "react-dnd";
import PanelIcon from "./panel-icon";
import ColorPicker from "./color-picker";
import Notification from "../../notification";

function Panel({
  color,
  index,
  handleMoveColor,
  removeColorPanel,
  handleLockStatus,
  updateColor,
  tempUpdateColor,
  name,
  fontColor,
  colors,
}) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [preColorPickerValue, setPreColorPickerValue] = useState("");
  const [inputHex, setInputHex] = useState(color);
  const [minPanelNum, setMinPanelNum] = useState(false);

  useEffect(() => {
    if (colors.length < 3) {
      setMinPanelNum(true);
    } else {
      setMinPanelNum(false);
    }
  }, [colors]);

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

  function setfontColor(fontColor) {
    if (fontColor == "#000000") {
      return "black";
    }
    return "white";
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
          <PanelIcon
            onClick={() => removeColorPanel(index)}
            iconSrc={`../../../icons/close_${setfontColor(fontColor)}.svg`}
            altText="close icon"
            isUnactive={minPanelNum}
            iconTip="Remove panel"
          />
          <PanelIcon
            onClick={handleCopyColor}
            iconSrc={`../../../icons/copy_${setfontColor(fontColor)}.svg`}
            altText="copy icon"
            iconTip="Copy colour"
          />
          <PanelIcon
            onClick={() => handleLockStatus(index)}
            iconSrc={`../../../icons/${
              colors[index].locked ? "locked" : "open"
            }_${setfontColor(fontColor)}.svg`}
            altText="locked status open icon"
            iconTip="Toggle lock"
          />
          <PanelIcon
            iconSrc={`../../../icons/move_${setfontColor(fontColor)}.svg`}
            altText="move panel icon"
            customClass={"move"}
            iconTip="Move panel"
          />
          <PanelIcon
            onClick={triggerColorPicker}
            content={color}
            iconTip="Select colour"
          />
          <div className="panel-name">
            <p className="small-copy">{name}</p>
          </div>
        </div>
      </section>
      {displayColorPicker && (
        <ColorPicker
          color={color}
          index={index}
          tempUpdateColor={tempUpdateColor}
          inputHex={inputHex}
          setInputHex={setInputHex}
          confirmColorPickerChange={confirmColorPickerChange}
          closeColorPicker={closeColorPicker}
        />
      )}
      {copySuccess && (
        <Notification
          noteIconSrc={'../../icons/tick_white.svg'}
          noteCopy={'color copied to clipboard!'}
          noteIconSrcCopy={'tick icon'}
        />
      )}
    </>
  );
}

export default Panel;
