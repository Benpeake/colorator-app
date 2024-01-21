import { Link, NavLink } from "react-router-dom";
import "./nav.css";
import Login from "./login";
import Logout from "./logout";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./mobile-menu";
import gsap from "gsap";

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tlMobMenRef = useRef(null);
  
  useEffect(() => {
    // GSAP animation setup
    const topL = document.getElementById("top");
    const midL = document.getElementById("mid");
    const botL = document.getElementById("bot");

    tlMobMenRef.current = gsap.timeline({ paused: true });

    tlMobMenRef.current.to(midL, {
      opacity: 0,
      duration: 0.3,
      ease: "sine.in",
    }, 0);

    tlMobMenRef.current.to([botL], {
      y: -25,
      duration: 0.3,
      ease: "sine.in",
    }, "-=0.3");
    tlMobMenRef.current.to([topL], {
      y: 25,
      duration: 0.3,
      ease: "sine.in",
    }, "-=0.3");

    tlMobMenRef.current.to(topL, {
      rotation: 45,
      transformOrigin: "50% 50%",
      duration: 0.3,
      ease: "power.in(4)",
    });

    tlMobMenRef.current.to(botL, {
      rotation: -45,
      transformOrigin: "50% 50%",
      duration: 0.3,
      ease: "power.in(4)",
    }, "-=0.3");

    return () => {
      tlMobMenRef.current = null; // Remove the reference to the GSAP timeline
    };
    
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      tlMobMenRef.current.reverse();
    } else {
      tlMobMenRef.current.play();
    }
  };

  return (
    <>
      <nav>
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
            <Link className="navlink grey" to="#" onClick={setDisplaySignUp}>
              My Palettes
            </Link>
          )}
          <NavLink className="navlink" to="/all-palettes">
            All Palettes
          </NavLink>
          <div className="v-line"></div>
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
        <div className="panel-icon-container mobile-menu-icon-container">
          <svg
          className="mobile-icon"
            width="90"
            height="62"
            viewBox="0 0 90 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleMobileMenu}
            style={{ cursor: "pointer" }}
          >
            <g id="mob-menu">
              <path id="top" d="M5 9V4H85V9H5Z" fill="#0D0A07" />
              <path id="mid" d="M5 34V29H85V34H5Z" fill="#0D0A07" />
              <path id="bot" d="M5 59V54H85V59H5Z" fill="#0D0A07" />
            </g>
          </svg>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <MobileMenu
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
          isMobileMenuOpen={isMobileMenuOpen}
        />
      )}
    </>
  );
}

export default Nav;
