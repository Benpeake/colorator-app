import { useNavigate } from "react-router-dom";
import "./liked-palette.css";
import { useState } from "react";

function LikedPalette({
  name,
  colors,
  id,
  updateColorsWithSavedPalette,
  token,
  ApiBlock,
  setCopySuccess,
  setUnlikePaletteSuccess,
  getAllMyPalettes,
  showSavedPalettes,
  getContrastColor
}) {
  const navigate = useNavigate();
  const [hoveredColor, setHoveredColor] = useState(null);

  function handleInfoIconClick(savedPaletteColors) {
    updateColorsWithSavedPalette(savedPaletteColors);
    navigate("/");
  }


  function handleUnlikeClick(id) {
    fetch(ApiBlock + "/palettes/like/" + id, {
      method: "DELETE",
      mode: "cors", 
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Palette successfully updated (like removed)") {
        setUnlikePaletteSuccess(true);
          getAllMyPalettes(showSavedPalettes);
          setTimeout(() => {
            setUnlikePaletteSuccess(false);
          }, 1500);
        } else {
          console.log(data.message);
        }
      });
  }

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
        <p className="palette-title small-copy">{name}</p>
        <div className="panel-icon-container">
        <img
          className="all-palettes-icon"
          src="`../../../icons/open_new_black.svg"
          onClick={() => {
            handleInfoIconClick(colors);
          }}
        />
        </div>
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
            {hoveredColor === color && <p className="hex-number small-copy">{color}</p>}
          </div>
        ))}
      </div>
      <div className="saved-palettes-container-footer">
      <div
          className="all-palettes-icon-container panel-icon-container"
          onClick={()=>{handleUnlikeClick(id)}}
        >
          <img
            className="all-palettes-icon"
            src="`../../../icons/heart_minus_black.svg"
          />
          <p className="small-print grey">Unlike</p>
        </div>
      </div>
    </div>
  );
}

export default LikedPalette;
