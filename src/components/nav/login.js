import { NavLink } from "react-router-dom";

function Login ({setDisplaylogin, setDisplaySignUp}) {

  return (
    <>
    <NavLink
      className="navlink" to="/"
        onClick={() => {
          setDisplaylogin(true);
      }}
      >
      Login
    </NavLink>
    <div>
      <NavLink
        className="gradient-border button gradient-text"
        to="/"
        onClick={() => {
          setDisplaySignUp(true);
        }}
      >
        Sign up
      </NavLink>
    </div>
  </>
  )
}

export default Login;
