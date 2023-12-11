import React, { useState } from "react";
import "./user-update.css";

function UserUpdate({
  formInput,
  currentUserDetail,
  userFormLabel,
  handleUpdateUer,
  updateUserID,
  updateEmailError,
  updateNameError,
}) {
  const [inputValue, setInputValue] = useState(currentUserDetail);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUer(inputValue);
  }

  return (
    <form className="user-detail-seg" onSubmit={handleSubmit}>
      <label className="med-copy bold">{userFormLabel}</label>
      <input
        className="user-details-input small-copy"
        type={updateUserID}
        id={updateUserID}
        name={updateUserID}
        value={inputValue}
        onChange={handleChange}
        required
      />
      {updateEmailError && (
          <p className=" error-update tiny-print">{updateEmailError}</p>
        )}
      {updateNameError && (
          <p className=" error-update tiny-print">{updateNameError}</p>
        )}
      <input
        className="user-detail-submit"
        type="submit"
        value="Update"
      />
    </form>
  );
}

export default UserUpdate;
