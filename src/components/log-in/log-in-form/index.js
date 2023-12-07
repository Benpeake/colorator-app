import React, { useState } from "react";
import "./log-in-form.css";
import Notification from "../../notification";

function LoginForm({
  ApiBlock,
  setToken,
  setUsername,
  setDisplaylogin,
  setLoginSuccess
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();

    fetch(ApiBlock + "/users/login", {
      method: "POST",
      body: JSON.stringify({
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
          setDisplaylogin(false);
          setLoginSuccess(true);
          setTimeout(() => {
            setLoginSuccess(false);
          }, 1500)
        }
      });
      
  }

  return (
    <>
      <form
        onSubmit={handleRegistrationSubmit}
        className="login-form small-copy"
      >
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
        <div className="">
          <input className="small-copy" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
