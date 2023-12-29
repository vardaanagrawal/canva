import React, { useState } from "react";
import "./auth.css";
import { signup } from "../../api";
import login_bg from "../../images/login_bg.avif";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const res = await signup({ name, email, password });
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
          <div className="auth-title">Signup</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <label>Name</label>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            ></input>
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
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            ></input>
            <input type="submit" value="Signup" className="submit-btn"></input>
          </form>
        </div>
      </div>
    </div>
  );
}
