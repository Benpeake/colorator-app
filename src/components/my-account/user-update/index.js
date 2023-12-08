import "./user-update.css";

function UserUpdate({
  handleUpdateUserChange,
  currentUserDetail,
  userFormLabel,
  handleUpdateUer,
  updateUserID,
}) {
  return (
    <form className="user-detail-seg">
      <label className="med-copy bold">{userFormLabel}</label>
      <input
        className="user-details-input small-copy"
        type={updateUserID}
        id={updateUserID}
        name={updateUserID}
        defaultValue={currentUserDetail}
        onChange={handleUpdateUserChange}
        required
      />
      <input
        className="user-detail-submit"
        type="submit"
        value="Update"
        onSubmit={handleUpdateUer}
      />
    </form>
  );
}

export default UserUpdate;
