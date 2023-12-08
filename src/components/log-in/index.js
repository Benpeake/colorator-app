import LoginForm from "./log-in-form";
import "./log-in.css";

function Login({
  ApiBlock,
  setToken,
  setUsername,
  setDisplaylogin,
  setLoginSuccess,
  setUserEmail,
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
        <div className="login-form">
          <h2 className="large-copy">Hello!</h2>
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
          />
        </div>
        <div className="login-footer">
          <p className="tiny-print grey">
            By continuing are agreeing to our terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
