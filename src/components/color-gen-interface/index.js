import Panel from "./color-gen-panel";
import "./interface.css";

function Interface({
  colors,
  handleMoveColor,
  removeColorPanel,
  handleLockStatus,
  updateColor,
  tempUpdateColor
}) {

  return (
    <section className="interface-container">
      {colors.map((color, index) => (
        <Panel
          key={index}
          color={color.color}
          name={color.name}
          fontColor={color.fontColor}
          index={index}
          handleMoveColor={handleMoveColor}
          removeColorPanel={removeColorPanel}
          handleLockStatus={handleLockStatus}
          updateColor={updateColor}
          tempUpdateColor={tempUpdateColor}
        />
      ))}
    </section>
  );
}

export default Interface;
