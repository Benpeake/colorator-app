import Panel from './color-gen-panel'
import './interface.css'

function Interface({colors}) {

    return(
        <section className='interface-container'>
{colors.map((color, index) => (
        <Panel
            color={color.color}
            colors={colors}
        />
      ))}
        </section>
    )
}

export default Interface