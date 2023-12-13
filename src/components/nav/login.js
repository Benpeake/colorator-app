import { Link, NavLink } from "react-router-dom";

function Login ({setDisplaylogin, setDisplaySignUp, isMobileMenuOpen, toggleMobileMenu}) {

  return (
    <>
    <Link
      className="navlink"
        onClick={() => {
          setDisplaylogin(true);
          if(isMobileMenuOpen){
            toggleMobileMenu()
        }
      }}
      >
      Login
    </Link>
    <div>
      <NavLink
        className="gradient-border button gradient-text navlink"
        onClick={() => {
          setDisplaySignUp(true);
          if(isMobileMenuOpen){
            toggleMobileMenu()
        }
      }}
      >
        Sign up
      </NavLink>
    </div>
  </>
  )
}

export default Login;
