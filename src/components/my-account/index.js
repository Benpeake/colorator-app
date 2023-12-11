import React, { useState } from "react";
import "./my-account.css";
import UserUpdate from "./user-update";
import PasswordUpdate from "./password-update";
import DeleteAccount from "./delete-account";

function MyAccount({
  userEmail,
  username,
  setUsername,
  setUserEmail,
  token,
  setAccountUpdateSuccess,
  ApiBlock,
  setToken,
  setDeleteAccountSuccess,
  setUserId,
}) {

const [updateEmailError, setupdateEmailError] = useState('')
const [updateNameError, setNameError] = useState('')
const [updatePasswordError, setPasswordError] = useState('')

  function handleEmailUpdate(email) {
    fetch(ApiBlock + "/users/update/email", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Email update successful") {
          setUserEmail(data.data.email);
          setAccountUpdateSuccess(true);
          setTimeout(() => {
            setAccountUpdateSuccess(false);
          }, 1500);
        } else {
            setupdateEmailError(data.message)
        }
      });
  }

  function handleNameUpdate(username) {
    fetch(ApiBlock + "/users/update/name", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Username update successful") {
          setUsername(data.data.name);
          setAccountUpdateSuccess(true);
          setTimeout(() => {
            setAccountUpdateSuccess(false);
          }, 1500);
        } else {
            setNameError(data.message)
        }
      });
  }

  function handleChangePassword(oldPassword, newPassword, confirmPassword) {
    fetch(ApiBlock + "/users/update/password", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Password updated successfully") {
          setAccountUpdateSuccess(true);
          setPasswordError("")
          setTimeout(() => {
            setAccountUpdateSuccess(false);
          }, 1500);
        } else {
            console.log(data)
            setPasswordError(data.message)
        }
      })
  }
  

  return (
    <div>
      <div className="page-heading">
        <h2 className="massive-copy">Account</h2>
        <p className="med-copy grey">Update and manage your account details.</p>
      </div>
      <div className="user-details-container">
        <UserUpdate
          currentUserDetail={username}
          userFormLabel={"Username"}
          handleUpdateUer={handleNameUpdate}
          updateUserID={"username-update"}
          formInput={"username"}
          updateNameError={updateNameError}
        />
        <UserUpdate
          currentUserDetail={userEmail}
          userFormLabel={"Email"}
          handleUpdateUer={handleEmailUpdate}
          updateUserID={"email-update"}
          formInput={"email"}
          updateEmailError={updateEmailError}
        />
        <PasswordUpdate 
            handleChangePassword={handleChangePassword}
            updatePasswordError={updatePasswordError}
        />
        <DeleteAccount
            token={token}
            ApiBlock={ApiBlock}
            setToken={setToken}
            setUsername={setUsername}
            setUserEmail={setUserEmail}
            setDeleteAccountSuccess={setDeleteAccountSuccess}
            setUserId={setUserId}
        />
      </div>
    </div>
  );
}

export default MyAccount;
