import "./add-palette.css";
import AddPaletteForm from "./add-palette-form";

function AddPalette({
  colors,
  token,
  setAddPaletteSuccess,
  ApiBlock,
  setDisplayAddPalette,
  userId,
}) {
  return (
    <div className="addPalette-overlay">
      <div className="addPalette">
        <div className="addPalette-topbar">
          <div className="panel-icon-container">
            <img
              className="overlay-icon"
              src="../../../icons/close_black.svg"
              alt="close icon"
              onClick={() => {
                setDisplayAddPalette(false);
              }}
            />
          </div>
        </div>
        <div className="addPalette-form">
          <h2 className="med-copy">Save palette</h2>
        </div>
        <div className="addPalette-form">
          <AddPaletteForm
            colors={colors}
            token={token}
            setAddPaletteSuccess={setAddPaletteSuccess}
            ApiBlock={ApiBlock}
            userId={userId}
            setDisplayAddPalette={setDisplayAddPalette}
          />
          <div className="addPalette-footer"></div>
        </div>
      </div>
    </div>
  );
}

export default AddPalette;
