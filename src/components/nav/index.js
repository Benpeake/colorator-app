import { NavLink } from "react-router-dom";
import "./nav.css";
import Login from "./login";
import Logout from "./logout";

function Nav({
  setDisplaySignUp,
  token,
  setToken,
  username,
  ApiBlock,
  setUsername,
  setLogoutSuccess,
  setDisplaylogin,
}) {
  return (
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
          {token ? (
            <Logout
              username={username}
              ApiBlock={ApiBlock}
              token={token}
              setUsername={setUsername}
              setToken={setToken}
              setLogoutSuccess={setLogoutSuccess}
            />
          ) : (
            <Login
              setDisplaylogin={setDisplaylogin}
              setDisplaySignUp={setDisplaySignUp}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
