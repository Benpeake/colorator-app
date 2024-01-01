import React, { useState, useEffect } from "react";
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
  token,
  copySuccess,
  setCopySuccess
}) {
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    const updateVh = () => {
      setVh(window.innerHeight * 0.01);
    };

    window.addEventListener("resize", updateVh);
    updateVh();

    return () => {
      window.removeEventListener("resize", updateVh);
    };
  }, []);

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
      <section
        className="interface-container"
        style={{
          minHeight: `calc(${vh * 100} - 11.1vw)`,
          height: `calc(${vh * 100} - 11.1vw)`,
        }}
      >
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
            copySuccess={copySuccess}
            setCopySuccess={setCopySuccess}
          />
        ))}
      </section>
    </>
  );
}

export default Interface;
