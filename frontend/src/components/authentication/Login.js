import React, { useState } from "react";
import "./auth.css";
// import login_bg from "../../images/login_bg.avif";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { signin, signinGoogle } from "../../redux/actions/authActions.js";

const initial_state = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(initial_state);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(1);
    if (form.name != "" && form.email != "" && form.password != "") {
      dispatch(signin(form, navigate, setLoading));
    }
  };

  const googleSignup = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  function handleGoogleLoginSuccess(tokenResponse) {
    setLoading(2);
    const accessToken = tokenResponse.access_token;
    dispatch(signinGoogle(accessToken, navigate, setLoading));
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          ></input>
          <input type="submit" value="Login"></input>
        </form>
        <div className="auth-actions">
          <div
            className="registered-btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Not Registered? Signup.
          </div>
          <div
            className="forgot-password-btn"
            onClick={() => {
              navigate("/forgotpassword");
            }}
          >
            Forgot Password
          </div>
        </div>
        <div className="auth-box-divider">
          <div>OR</div>
        </div>
        <div className="google-signup-btn" onClick={googleSignup}>
          <i className="fa-brands fa-google"></i> Sign in with google
        </div>
      </div>
    </div>
  );
}
