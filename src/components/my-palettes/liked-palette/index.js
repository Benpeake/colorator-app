import { useNavigate } from "react-router-dom";
import "./liked-palette.css";
import { useState } from "react";

function LikedPalette({
  name,
  colors,
  id,
  likes,
  updateColorsWithSavedPalette,
  token,
  ApiBlock,
  setIsLiked,
  getAllPalettes,
  setDisplaylogin,
  setCopySuccess,
}) {
  const navigate = useNavigate();
  const [hoveredColor, setHoveredColor] = useState(null);

  function handleInfoIconClick(savedPaletteColors) {
    updateColorsWithSavedPalette(savedPaletteColors);
    navigate("/");
  }

  function getContrastColor(hexColor) {
    const hex = hexColor.slice(1);
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "var(--black)" : "var(--white)";
  }

  function handleDeletePalette() {}

  function setPalettePublic() {}

  function setPalettePrivate() {}

  function handleUnLikePalette() {}

  function handleColorPanelClick(color) {
    const textarea = document.createElement("textarea");
    textarea.value = color;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      navigator.clipboard
        .writeText(color)
        .then(() => {
          console.log("Color hex copied to clipboard");
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false);
          }, 1500);
        })
        .catch((err) => {
          console.error("Unable to copy color hex to clipboard", err);
        });
    } catch (err) {
      console.error("Clipboard API not supported", err);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  return (
    <div className="saved-palette-container">
      <div className="palettes-container-header">
        <p className="small-copy">{name}</p>
        <img
          className="all-palettes-icon"
          src="`../../../icons/info_black.svg"
          onClick={() => {
            handleInfoIconClick(colors);
          }}
        />
      </div>
      <div className="palettes-container-colors">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`palettes-container-panel ${
              hoveredColor === color ? "hovered-color-panel" : ""
            }`}
            style={{
              backgroundColor: color,
              width: hoveredColor === color ? "30%" : "auto",
              color: getContrastColor(color),
            }}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
            onClick={() => {
              handleColorPanelClick(color);
            }}
          >
            {hoveredColor === color && <p className="hex-number">{color}</p>}
          </div>
        ))}
      </div>
      <div className="palettes-container-footer">
        <div className="all-palettes-icon-container">
          <p className="tiny-copy grey"> Likes</p>
        </div>
      </div>
    </div>
  );
}

export default LikedPalette;
