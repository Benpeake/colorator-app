import RegistrationForm from "./sign-up-form";
import "./sign-up.css"

function SignUp ({displaySignUp, setDisplaySignUp, ApiBlock}) {


    return(
        <div className="signUp-overlay">
            <div className="sign-up">
                <div className="sign-up-topbar">
                    <div className="panel-icon-container">
                        <img
                            className="overlay-icon"
                            src="../../../icons/close_black.svg"
                            alt="close icon"
                            onClick={() => {setDisplaySignUp(false)}}
                        />
                    </div>
                </div>
                <div className="sign-up-form">
                    <h2 className="large-copy">
                        Hello!
                    </h2>
                </div>
                <div className="sign-up-form">
                    <p className="small-print down-gap">
                        Fill in the the form below to join.
                    </p>
                </div>
                <div className="sign-up-form">
                    <RegistrationForm
                        ApiBlock={ApiBlock}
                    />
                </div>
                <div className="sign-up-footer">
                <p className="tiny-print grey">
                        By joining you are agreeing to our terms of service.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp