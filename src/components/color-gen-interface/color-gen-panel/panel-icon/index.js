import React, { useState } from "react";
import "./panel-icon.css";

function PanelIcon({
  onClick,
  iconSrc,
  altText,
  iconTip,
  isUnactive,
  customClass,
  content
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`panel-icon-container ${isUnactive ? "unactive" : ""}
        ${isHovered ? "hovered" : ""}
        ${customClass}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isUnactive ? null : ( 
        <>
          {iconSrc ? (
            <img className="panel-icon" src={iconSrc} alt={altText} />
          ) : (
            <p className="med-copy">{content}</p>
          )}
          {isHovered && (
            <div className="iconTip-overlay">
              <p className="tiny-print">{iconTip}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PanelIcon;
