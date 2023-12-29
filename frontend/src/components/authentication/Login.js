import React, { useState } from "react";
import "./auth.css";
import { login } from "../../api";
import login_bg from "../../images/login_bg.avif";

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
    <div
      className="auth"
      style={{
        backgroundImage: `url(${login_bg})`,
        backgroundSize: "100% auto",
      }}
    >
      <div className="auth-inner">
        <div className="auth-logo">
          <img src="https://static.canva.com/web/images/856bac30504ecac8dbd38dbee61de1f1.svg"></img>
        </div>
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
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            ></input>
            <label>Password</label>
            <input
              placeholder="Password"
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
    </div>
  );
}
