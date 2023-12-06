import { HexColorInput, HexColorPicker } from "react-colorful";
import "./color-picker.css"

function ColorPicker (
    {
        color,
        index,
        tempUpdateColor,
        inputHex,
        setInputHex,
        confirmColorPickerChange,
        closeColorPicker,
      }) {

    return(
        <div className="color-picker-overlay">
        <div className="color-picker">
          <div>
            <HexColorPicker
              color={color}
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
              color={color}
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
                alt="tick icon"
              />
            </div>
            <div className="panel-icon-container" onClick={closeColorPicker}>
              <img
                className="panel-icon"
                src="../../../icons/close_white.svg"
                alt="close icon"
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default ColorPicker