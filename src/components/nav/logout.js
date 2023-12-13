import { NavLink, useNavigate } from "react-router-dom";

function Logout({
  username,
  ApiBlock,
  token,
  setUsername,
  setToken,
  setLogoutSuccess,
  setUserEmail,
  setUserId
}) {

  const navigate = useNavigate()

  function handleLogoutSubmit() {
    fetch(ApiBlock + "/users/logout", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Logout successful") {
          localStorage.removeItem("token");
          setToken(null);
          setUsername("");
          setUserEmail("");
          setUserId("")
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
      <NavLink className="navlink" to="/my-account">
        My Account
      </NavLink>
      <NavLink className="navlink" to="/" onClick={handleLogoutSubmit}>
        Logout
      </NavLink>
    </>
  );
}

export default Logout;
