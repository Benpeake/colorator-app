import { NavLink } from "react-router-dom";
import "./nav.css"
import { useEffect, useState } from "react";

function Nav({displaySignUp, setDisplaySignUp}){

    return(
        <nav>
            <div className="nav-bar-container">
                <div className="nav-left">
                    <p className="bold gradient-text med-copy" to="/">
                        COLORATOR
                    </p>
                </div>
                <div className="nav-right small-copy">
                    <NavLink className="navlink" to="/">
                        Generator
                    </NavLink>
                    <NavLink className="navlink" to="/">
                        My Palettes
                    </NavLink>
                    <NavLink className="navlink" to="/">
                        All Palettes
                    </NavLink>
                    <p>|</p>
                    <NavLink className="navlink" to="/">
                        Login
                    </NavLink>
                    <div>
                    <NavLink
                        className="gradient-border button gradient-text" to="/"
                        onClick={() => {setDisplaySignUp(true)}}
                    >
                        Sign up
                    </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;