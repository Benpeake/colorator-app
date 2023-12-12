import { useNavigate } from "react-router-dom";
import "./my-palette.css";
import { useState } from "react";

function MyPalette({
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
  publicStatus,
  setDeleteSuccess,
  showSavedPalettes,
  getAllMyPalettes
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

  function handleDeletePalette (id) {
    fetch(ApiBlock + "/palettes/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.message === `Palette removed`) {
          setDeleteSuccess(true)
          getAllMyPalettes(showSavedPalettes)
          setTimeout(() => {
            setDeleteSuccess(false)
          }, 1500);
        } else {
          console.log(data.message);
        }
      });
  }

  function setPalettePublic() {}

  function setPalettePrivate() {}


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
            {hoveredColor === color && <p className="hex-number">{color}</p>}
          </div>
        ))}
      </div>
      <div className="Mypalettes-container-footer">
        <div className="all-palettes-icon-container panel-icon-container">
          <img
            className="all-palettes-icon"
            src="`../../../icons/close_black.svg"
          />
          <p 
            className="tiny-copy grey"
            onClick={() => {handleDeletePalette(id)}}
          >
            Delete</p>
        </div>
        { publicStatus == 1 ? (
        <div className="all-palettes-icon-container panel-icon-container">
          <img
            className="all-palettes-icon"
            src="`../../../icons/make_private_black.svg"
          />
          <p className="tiny-copy grey">Private</p>
        </div>
      ) : (
        <div className="all-palettes-icon-container panel-icon-container">
        <img
          className="all-palettes-icon"
          src="`../../../icons/make_public_black.svg"
        />
        <p className="tiny-copy grey">Public</p>
      </div>
      )}
      </div>
    </div>
  );
}

export default MyPalette;
