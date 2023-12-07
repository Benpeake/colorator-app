import React, { useState } from "react";
import "./sign-up-form.css";

function RegistrationForm({ApiBlock}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
        console.log(data)
      });

  }

  return (
    <form onSubmit={handleRegistrationSubmit} className="registration-form small-copy">
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
      <div className="">
      <input className="small-copy" type="submit" value="Submit" />
      </div>
    </form>
  );
}

export default RegistrationForm;
