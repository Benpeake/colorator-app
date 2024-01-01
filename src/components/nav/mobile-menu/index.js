import { Link, NavLink } from "react-router-dom";
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
  isMobileMenuOpen
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
      <Link className="navlink" to="/" onClick={toggleMobileMenu}>
        Generator
      </Link>
      {token ? (
        <Link
          className="navlink"
          to="/my-palettes"
          onClick={toggleMobileMenu}
        >
          My Palettes
        </Link>
      ) : (
        <Link className="navlink unactiveLink" onClick={()=>{
          setDisplaySignUp(true)
          toggleMobileMenu()
          }}>
          My Palettes
        </Link>
      )}
      <Link
        className="navlink"
        to="/all-palettes"
        onClick={toggleMobileMenu}
      >
        All Palettes
      </Link>
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
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
      ) : (
        <Login
          setDisplaylogin={setDisplaylogin}
          setDisplaySignUp={setDisplaySignUp}
          setUserEmail={setUserEmail}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
    </div>
  );
}

export default MobileMenu;
