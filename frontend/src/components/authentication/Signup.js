import React, { useState } from "react";
import "./auth.css";
import { signup } from "../../api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const res = await signup({ name, email, password });
    console.log(res);
  }

  return (
    <div className="auth">
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
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
          <input type="submit" value="Signup" className="submit-btn"></input>
        </form>
      </div>
    </div>
  );
}
