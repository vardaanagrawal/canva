import React, { useState } from "react";

const initial_state = {
  email: "",
  otp: "",
  password: "",
};

export default function ForgotPassword() {
  const [form, setForm] = useState(initial_state);
  const [mode, setMode] = useState(1);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 1) {
      if (form.email != "") {
        // send otp
      }
      setMode(2);
    } else if (mode === 2) {
      if (form.otp != "") {
        // verify otp
      }
      setMode(3);
    } else if (mode === 3) {
      if (form.password != "") {
        // reset password
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Forgot Password?</h1>
        {mode === 1 && (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            ></input>
            <input type="submit" value="Continue"></input>
          </form>
        )}
        {mode === 2 && (
          <form onSubmit={handleSubmit}>
            <div style={{textAlign: "center"}}>Please enter the OTP sent to {form.email}</div>
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              onChange={handleChange}
              required
            ></input>
            <input type="submit" value="Verify"></input>
          </form>
        )}
        {mode === 3 && (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              onChange={handleChange}
              required
            ></input>
            <input type="submit" value="Reset Password"></input>
          </form>
        )}
      </div>
    </div>
  );
}
