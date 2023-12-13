import { useState} from "react";
import "./delete-account.css";
import { useHistory, useNavigate} from "react-router-dom";

function DeleteAccount({
    token,
    ApiBlock,
    setToken,
    setUsername,
    setUserEmail,
    setDeleteAccountSuccess,
    setUserId,
}) {
    const [firstDelete, setFirstDelete] = useState(false);
    const navigate = useNavigate()
    

    function handleDeleteAccount(e){
        e.preventDefault()

        fetch(ApiBlock + "/users/delete", {
            method: "DELETE",
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
              if (data.message === "User deleted successfully") {
                setToken(null);
                setUsername("");
                setUserEmail("");
                setUserId(0)
                setDeleteAccountSuccess(true)
                setTimeout(() => {
                    setDeleteAccountSuccess(false);
                    navigate("/");
                }, 1500)
              } 
            });      
        }

    return (
        <form className="user-delete-seg">
            {firstDelete ? (
                <>
                    <label className="small-copy red">Are you sure you would like to remove your account?</label>
                    <input onClick={handleDeleteAccount} className="delete-button" type="submit" value="Yes" />
                    <input onClick={(e) => {
                        e.preventDefault();
                        setFirstDelete(false);
                    }}
                        className="delete-button"
                        type="submit"
                        value="No" />
                </>
            ) : (
                <>
                    <label className="small-copy red">Remove your account and associated palettes</label>
                    <input onClick={(e) => {
                        e.preventDefault();
                        setFirstDelete(true);
                    }}
                        className="delete-button"
                        type="submit"
                        value="Delete" />
                </>
            )}
        </form>
    );
}

export default DeleteAccount;
