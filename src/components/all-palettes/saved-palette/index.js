import { useNavigate } from "react-router-dom";
import "./saved-palette.css";
import { useState } from "react";

function SavedPalette({
  name,
  colors,
  id,
  likes,
  updateColorsWithSavedPalette,
  index,
  token,
  ApiBlock,
  setIsLiked,
  getAllPalettes
}) {

    const navigate = useNavigate()
    const [likeError, setLikeError] = useState("")


    function handleInfoIconClick(savedPaletteColors) {
        updateColorsWithSavedPalette(savedPaletteColors);
        navigate("/")
      }

    function handleLikeClick (id) {
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
              getAllPalettes()
              setTimeout(() => {
                setIsLiked(false);
            }, 1500)
            } else if (data.message === "Palette already liked"){
                setLikeError(data.message)
                setTimeout(() => {
                    setLikeError("")
                }, 1500)
            } else {
                console.log(data.message)
            }
          })
      };

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
                <img 
                    className="all-palettes-icon"
                    src="`../../../icons/like_black.svg"
                    onClick={() =>{handleLikeClick(id)}}
                    style={{ cursor: "pointer" }}
                />
                <p className="tiny-copy grey"> Likes {likes}</p>
            </div>
            {likeError != "" && (
                    <p className="small-print red">{likeError}</p>
                )}
        </div>
    </div>
  );
}

export default SavedPalette;
