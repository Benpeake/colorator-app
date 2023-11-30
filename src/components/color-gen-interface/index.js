import Panel from './color-gen-panel'
import './interface.css'
import { useDrag, useDrop } from "react-dnd";


function Interface({colors, setColors, handleMoveColor}) {

    return(
        <section 
        className='interface-container'>
        {colors.map((color, index) => (
            <Panel
                color={color.color}
                colors={colors}
                index={index}
                handleMoveColor={handleMoveColor}
            />
      ))}
        </section>
    )
}

export default Interface