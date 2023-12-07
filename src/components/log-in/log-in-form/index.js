import React, { useState } from "react";
import "./log-in-form.css";

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
  const [loginError, setLoginError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleLoginSubmit(e) {
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
        setLoginError((data.message))
      });
      
  }

  return (
    <>
      <form
        onSubmit={handleLoginSubmit}
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

export default LoginForm;
