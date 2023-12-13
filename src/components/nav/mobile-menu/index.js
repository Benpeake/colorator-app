import { NavLink } from "react-router-dom";
import "./mobile-menu.css";
import Logout from "../logout";
import Login from "../login";

function MobileMenu({
  token,
  setDisplaySignUp,
  username,
  ApiBlock,
  setUsername,
  setToken,
  setLogoutSuccess,
  setUserEmail,
  setUserId,
  setDisplaylogin,
  toggleMobileMenu,
}) {
  return (
    <div className="mobile-menu-display">
      <div className="panel-icon-container close-button-container">
        <img
          className="mobile-menu-icon"
          src="`../../../icons/close_black.svg"
          style={{ cursor: "pointer" }}
          onClick={toggleMobileMenu}
        />
      </div>
      <NavLink className="navlink" to="/" onClick={toggleMobileMenu}>
        Generator
      </NavLink>
      {token ? (
        <NavLink
          className="navlink"
          to="/my-palettes"
          onClick={toggleMobileMenu}
        >
          My Palettes
        </NavLink>
      ) : (
        <NavLink className="navlink" onClick={setDisplaySignUp}>
          My Palettes
        </NavLink>
      )}
      <NavLink
        className="navlink"
        to="/all-palettes"
        onClick={toggleMobileMenu}
      >
        All Palettes
      </NavLink>
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
  );
}

export default MobileMenu;
