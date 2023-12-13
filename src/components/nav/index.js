import { NavLink } from "react-router-dom";
import "./nav.css";
import Login from "./login";
import Logout from "./logout";
import { useState } from "react";
import MobileMenu from "./mobile-menu";

function Nav({
  setDisplaySignUp,
  token,
  setToken,
  username,
  ApiBlock,
  setUsername,
  setLogoutSuccess,
  setDisplaylogin,
  setUserEmail,
  setUserId,
}) {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (

    <>
    <nav>
      <div className="nav-bar-container">
        <div className="nav-left">
          <NavLink className="bold gradient-text med-copy" to="/">
            COLORATOR
          </NavLink>
        </div>
        <div className="nav-right small-copy">
          <NavLink className="navlink" to="/">
            Generator
          </NavLink>
          {token ? (
          <NavLink className="navlink" to="/my-palettes">
            My Palettes
          </NavLink>
          ) : (
          <NavLink className="navlink" onClick={setDisplaySignUp}>
            My Palettes
          </NavLink>
          )}
          <NavLink className="navlink" to="/all-palettes">
            All Palettes
          </NavLink>
          <p>|</p>
          {token ? (
            <Logout
              username={username}
              ApiBlock={ApiBlock}
              token={token}
              setUsername={setUsername}
              setToken={setToken}
              setLogoutSuccess={setLogoutSuccess}
              setUserEmail={setUserEmail}
              setUserId={setUserId}
            />
          ) : (
            <Login
              setDisplaylogin={setDisplaylogin}
              setDisplaySignUp={setDisplaySignUp}
              setUserEmail={setUserEmail}
            />
          )}
        </div>
        <div className="panel-icon-container mobile-menu-icon-container" >
        <img
              className="mobile-menu"
              src="`../../../icons/mob_menu_black.svg"
              style={{ cursor: "pointer" }}
              onClick={toggleMobileMenu}
            />
      </div>
      </div>
    </nav>
    {isMobileMenuOpen && <MobileMenu
      token={token}
      setDisplaySignUp={setDisplaySignUp}
      username={username}
      ApiBlock={ApiBlock}
      setUsername={setUsername}
      setToken={setToken}
      setLogoutSuccess={setLogoutSuccess}
      setUserEmail={setUserEmail}
      setUserId={setUserId}
      setDisplaylogin={setDisplaylogin}
      toggleMobileMenu={toggleMobileMenu}
    />}
    </>
  );
}

export default Nav;
