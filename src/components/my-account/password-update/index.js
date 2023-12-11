import React, { useState } from "react";
import "./password-update.css";

function PasswordUpdate({ handleChangePassword, updatePasswordError}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    handleChangePassword(oldPassword, newPassword, confirmPassword);

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <form className="user-detail-seg" onSubmit={handleSubmit}>
      <div className="label-wrapper">
        <label className="med-copy bold">Password</label>
        <label className="grey tiny-print normal">Must be 6 characters</label>
      </div>

      <div className="password-input-section">
        <label className="sub-label small-copy grey">Current password</label>
        <input
          className="user-details-input small-copy"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </div>
      <div className="password-input-section">
        <label className="sub-label small-copy grey">New password</label>
        <input
          className="user-details-input small-copy"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="password-input-section">
        <label className="sub-label small-copy grey">Confirm password</label>
        <input
          className="user-details-input small-copy"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {updatePasswordError && (
          <p className=" error-update-password tiny-print">{updatePasswordError}</p>
        )}
      </div>
      <input className="user-detail-submit" type="submit" value="Update" />
    </form>
  );
}

export default PasswordUpdate;
