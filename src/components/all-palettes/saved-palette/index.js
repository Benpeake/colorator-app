import { useNavigate } from "react-router-dom";
import "./saved-palette.css";
import { useState } from "react";

function SavedPalette({
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
  const [likeError, setLikeError] = useState("");
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

  function handleLikeClick(id) {
    fetch(ApiBlock + "/palettes/like/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Palette successfully updated") {
          setIsLiked(true);
          getAllPalettes();
          setTimeout(() => {
            setIsLiked(false);
          }, 1500);
        } else if (data.message === "Palette already liked") {
          setLikeError(data.message);
          setTimeout(() => {
            setLikeError("");
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
      navigator.clipboard.writeText(color).then(() => {
        console.log("Color hex copied to clipboard");
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1500);
      }).catch((err) => {
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
            className={`palettes-container-panel ${hoveredColor === color ? "hovered-color-panel" : ""}`}
            style={{
              backgroundColor: color,
              width: hoveredColor === color ? "30%" : "auto",
              color: getContrastColor(color)
            }}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
            onClick={() => { handleColorPanelClick(color)}}
          >
            {hoveredColor === color && (
              <p className="hex-number">{color}</p>
            )}
          </div>
        ))}
      </div>
      <div className="palettes-container-footer">
        <div className="all-palettes-icon-container">
          {token ? (
            <div className="panel-icon-container">
            <img
              className="all-palettes-icon"
              src="`../../../icons/like_black.svg"
              onClick={() => {
                handleLikeClick(id);
              }}
              style={{ cursor: "pointer" }}
            />
            </div>
          ) : (
            <div className="panel-icon-container">
            <img
              className="all-palettes-icon"
              src="`../../../icons/like_black.svg"
              onClick={() => {
                setDisplaylogin(true);
              }}
              style={{ cursor: "pointer" }}
            />
            </div>
          )}
          <p className="small-print grey"> Likes {likes}</p>
        </div>
        {likeError != "" && <p className="small-print">{likeError}</p>}
      </div>
    </div>
  );
}

export default SavedPalette;
