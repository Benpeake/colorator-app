import LoginForm from "./log-in-form";
import "./log-in.css";

function Login({
  ApiBlock,
  setToken,
  setUsername,
  setDisplaylogin,
  setLoginSuccess,
  setUserEmail,
  setUserId,
}) {
  return (
    <div className="login-overlay">
      <div className="login">
        <div className="login-topbar">
          <div className="panel-icon-container">
            <img
              className="overlay-icon"
              src="../../../icons/close_black.svg"
              alt="close icon"
              onClick={() => {
                setDisplaylogin(false);
              }}
            />
          </div>
        </div>
        <div className="modal-title">
            <h2 className="med-copy">Log in</h2>
          </div>
        <div className="login-form">
          <p className="small-print down-gap">
            Please enter your login details.
          </p>
        </div>
        <div className="login-form">
          <LoginForm
            setDisplaylogin={setDisplaylogin}
            ApiBlock={ApiBlock}
            setToken={setToken}
            setUsername={setUsername}
            setLoginSuccess={setLoginSuccess}
            setUserEmail={setUserEmail}
            setUserId={setUserId}
          />
        </div>
        <div className="login-footer">
        </div>
      </div>
    </div>
  );
}

export default Login;
