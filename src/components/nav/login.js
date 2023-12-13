import { NavLink } from "react-router-dom";

function Login ({setDisplaylogin, setDisplaySignUp}) {

  return (
    <>
    <NavLink
      className="navlink"
        onClick={() => {
          setDisplaylogin(true);
      }}
      >
      Login
    </NavLink>
    <div>
      <NavLink
        className="gradient-border button gradient-text navlink"
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
