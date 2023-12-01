import Panel from './color-gen-panel'
import './interface.css'
import { useDrag, useDrop } from "react-dnd";


function Interface({colors, setColors, handleMoveColor, removeColorPanel, handleLockStatus}) {

    return(
        <section 
        className='interface-container'>
        {colors.map((color, index) => (
            <Panel
                key={index}
                color={color.color}
                colors={colors}
                index={index}
                handleMoveColor={handleMoveColor}
                removeColorPanel ={removeColorPanel}
                handleLockStatus={handleLockStatus}
            />
      ))}
        </section>
    )
}

export default Interface