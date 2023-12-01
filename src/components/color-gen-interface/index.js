import Panel from './color-gen-panel'
import './interface.css'
import { useDrag, useDrop } from "react-dnd";


function Interface({colors, setColors, handleMoveColor, removeColorPanel}) {

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
            />
      ))}
        </section>
    )
}

export default Interface