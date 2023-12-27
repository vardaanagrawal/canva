import React, { useState } from "react";
import "./auth.css";
import { login } from "../../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await login({ email, password });
    if (res.success) {
      window.localStorage.setItem("Canva_User", res.userId);
      window.location.href = "/";
    } else {
      window.alert(res.message);
    }
    console.log(res);
  }

  return (
    <div className="auth">
      <div className="auth-box">
        <div className="auth-title">Login</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          ></input>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></input>
          <input type="submit" value="Login" className="submit-btn"></input>
        </form>
      </div>
    </div>
  );
}
