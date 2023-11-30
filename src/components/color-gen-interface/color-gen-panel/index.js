import './panel.css'

function Panel({colors, color}) {

    return(
        <section 
            className='panel'
            style={{ backgroundColor: color}}
        >
        </section>
    )
}

export default Panel