import './controller.css'

function Controller({generateRandomColors}) {

    return(
        <section className='controller-contrainer'>
            <div className='controller-left'>
                <div className='icon-container'>
                    <img className="icon" src="../../../icons/plus_black.svg" alt="add panel icon"/>
                    <p className='small-copy'>Panel</p>
                </div>
                <div className='icon-container'>
                    <img className="icon" src="../../../icons/like_black.svg" alt="save icon"/>
                    <p className='small-copy'>Save</p>
                </div>
                <div className='icon-container'>
                    <img className="icon" src="../../../icons/undo_black.svg" alt="undo icon"/>
                    <p className='small-copy'>Undo</p>
                </div>
                <div className='icon-container'>
                    <img className="icon" src="../../../icons/redo_black.svg" alt="redo icon"/>
                    <p className='small-copy'>Redo</p>
                </div>
                <div className='icon-container'>
                    <p className='small-copy'>|</p>
                </div>
                <div 
                    className='icon-container'
                    onClick={generateRandomColors}
                >
                <img className="icon" src="../../../icons/boom_black.svg" alt="generate icon"/>
                    <p className='small-copy'>Generate!</p>
                </div>
            </div>
            <div className='controller-right'>
            </div>
        </section>
    )
}

export default Controller