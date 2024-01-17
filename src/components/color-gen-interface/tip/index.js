import { useEffect } from "react";
import "./tip.css";

function Tip({setShowTip, tipCopy}) 
{
    return(
    <div className="tip-container icon-container">
        <p className="small-print">👉 {tipCopy}</p>
        <img
            className="icon tip-icon"
            src="../../../icons/close_white.svg"
            alt="save icon"
            onClick={()=> {setShowTip(false)}}
          />
    </div>
    )

}

export default Tip