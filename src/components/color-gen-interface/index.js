import { useEffect, useState } from "react";
import Controller from "./color-gen-controller";
import Panel from "./color-gen-panel";
import "./interface.css";
import Tip from "./tip";


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
  setCopySuccess,
}) {

  const [showSpaceTip, setShowSpaceTip] = useState(true);
  const [showUndoRedoTip, setShowUndoRedoTip] = useState(false)
  const panelWidth = 100 / colors.length; 

  function hideSpaceTipShowUndoRedoTip(){
    setShowSpaceTip(false)
    setTimeout(() => {
      setShowUndoRedoTip(true)
    }, 1000)
  }

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
        setShowSpaceTip={setShowSpaceTip}
        setShowUndoRedoTip={setShowUndoRedoTip}
      />

      {showSpaceTip ? (
        <Tip
          setShowTip={hideSpaceTipShowUndoRedoTip}
          tipCopy={"You can also press the spacebar to generate new colours!"}
        />
      ) : (
        ""
      )}
      {showUndoRedoTip ? (
        <Tip
          setShowTip={setShowUndoRedoTip}
          tipCopy={"'Command-Z' to undo - 'Command-Shift-Z' to redo!"}
        />
      ) : (
        ""
      )}

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
            copySuccess={copySuccess}
            setCopySuccess={setCopySuccess}
          />
        ))}
      </section>
    </>
  );
}

export default Interface;
