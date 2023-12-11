import "./saved-palette.css";

function SavedPalette({
  name,
  colors,
  id,
  likes
}) {
  return (
    <div className="saved-palette-container">
      <div className="palettes-container-header">
        <p className="small-copy">{name}</p>
        <img  className="all-palettes-icon" src="`../../../icons/info_black.svg" />
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
                <p className="tiny-copy grey"> Like {likes}</p>
            </div>
        </div>
    </div>
  );
}

export default SavedPalette;
