import { Link, NavLink, useNavigate } from "react-router-dom";

function Logout({
  username,
  ApiBlock,
  token,
  setUsername,
  setToken,
  setLogoutSuccess,
  setUserEmail,
  setUserId,
  isMobileMenuOpen,
  toggleMobileMenu,
}) {
  const navigate = useNavigate();

  function handleLogoutSubmit() {
    fetch(ApiBlock + "/users/logout", {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logout successful") {
          setToken(null);
          setUsername("");
          setUserEmail("");
          setUserId("");
          setLogoutSuccess(true);
          setTimeout(() => {
            setLogoutSuccess(false);
            navigate("/");
          }, 1500);
        }
      });
  }

  return (
    <>
      <p className="greeting">
        Hello <span className="bold">{username}</span>
      </p>
      <NavLink
        className="navlink"
        to="/my-account"
        onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
      >
        My Account
      </NavLink>
      <Link className="navlink" to="/" onClick={handleLogoutSubmit}>
        Logout
      </Link>
    </>
  );
}

export default Logout;
