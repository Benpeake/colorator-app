import { useNavigate } from "react-router-dom";
import "./saved-palette.css";

function SavedPalette({
  name,
  colors,
  id,
  likes,
  updateColorsWithSavedPalette,
  index
}) {

    const navigate = useNavigate()

    function handleInfoIconClick(savedPaletteColors) {
        updateColorsWithSavedPalette(savedPaletteColors);
        navigate("/")
      }

  return (
    <div className="saved-palette-container">
      <div className="palettes-container-header">
        <p className="small-copy">{name}</p>
        <img
            className="all-palettes-icon"
            src="`../../../icons/info_black.svg"
            onClick={() => {handleInfoIconClick(colors)}}
        />
      </div>
      <div className="palettes-container-colors">
        {colors.map((color, index) => (
          <div
            key={index}
            className="palettes-container-panel"
            style={{ backgroundColor: color }}
          >
          </div>
        ))}
      </div>
        <div className="palettes-container-footer">
            <div className="all-palettes-icon-container">
                <img  className="all-palettes-icon" src="`../../../icons/like_black.svg" />
                <p className="tiny-copy grey"> Likes {likes}</p>
            </div>
        </div>
    </div>
  );
}

export default SavedPalette;
