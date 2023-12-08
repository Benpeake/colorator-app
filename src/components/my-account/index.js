import "./my-account.css";
import UserUpdate from "./user-update";

function MyAccount({ userEmail, username, setUsername, setUSerEmail }) {
  return (
    <div>
      <div className="page-heading">
        <h2 className="massive-copy">Account</h2>
        <p className="med-copy grey">Update and mange your account details.</p>
      </div>
      <div className="user-details-container">
        <UserUpdate
            // handleUpdateUserChange={}  
            currentUserDetail={username}
            userFormLabel={'Username'}
            // handleUpdateUer={}
            updateUserID={'username-update'}
        />
        <UserUpdate
            // handleUpdateUserChange={}  
            currentUserDetail={userEmail}
            userFormLabel={'Email'}
            // handleUpdateUer={}
            updateUserID={'email-update'}
        />
      </div>
    </div>
  );
}

export default MyAccount;
