import React, { useState } from "react";
import "./sign-up-form.css";
import Notification from "../../notification";

function RegistrationForm({
  ApiBlock,
  token,
  setToken,
  displaySignUp,
  setDisplaySignUp,
  registrationSuccess,
  setRegistrationSuccess,
  setUsername,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();

    fetch(ApiBlock + "/users/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.username,
        email: formData.email,
        password: formData.password,
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          setToken(data.access_token);
          setUsername(data.username)
          setDisplaySignUp(false);
          setRegistrationSuccess(true);
          setTimeout(() => {
            setRegistrationSuccess(false);
          }, 1500)
        }
        setLoginError(data.message)
      });
  }

  return (
    <>
      <form
        onSubmit={handleRegistrationSubmit}
        className="registration-form small-copy"
      >
        <div className="form-seg">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-seg">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-seg">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <p className="tiny-print grey form-info"> must be 6 characters</p>
        {loginError && (
          <p className=" error tiny-print">{loginError}</p>
        )}
        <div className="">
          <input className="small-copy" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;
