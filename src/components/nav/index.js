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
  setUserEmail,
}) {
  return (
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
          <NavLink className="navlink" to="/">
            My Palettes
          </NavLink>
          ) : (
          <NavLink className="navlink" to="/"  onClick={setDisplaySignUp}>
            My Palettes
          </NavLink>
          )}
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
              setUserEmail={setUserEmail}
            />
          ) : (
            <Login
              setDisplaylogin={setDisplaylogin}
              setDisplaySignUp={setDisplaySignUp}
              setUserEmail={setUserEmail}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
