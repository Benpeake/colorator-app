import { useState } from "react";
import Controller from "./color-gen-controller";
import Panel from "./color-gen-panel";
import "./interface.css";


function Interface({
  colors,
  handleMoveColor,
  removeColorPanel,
  handleLockStatus,
  updateColor,
  tempUpdateColor,
  generateRandomColor,
  undo,
  redo,
  addColorPanel,
  history,
  historyIndex,
  setDisplayAddPalette,
  setDisplaySignUp,
  token
}) {

  return (
    <>
    <Controller
    generateRandomColor={generateRandomColor}
    undo={undo}
    redo={redo}
    addColorPanel={addColorPanel}
    colors={colors}
    history={history}
    historyIndex={historyIndex}
    setDisplayAddPalette={setDisplayAddPalette}
    setDisplaySignUp={setDisplaySignUp}
    token={token}
  />
    <section className="interface-container">
      {colors.map((color, index) => (
        <Panel
          colors={colors}
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
    </>
  );
}

export default Interface;
