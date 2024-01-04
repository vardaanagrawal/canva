import React, { useState } from "react";
import "./auth.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { signup, signupGoogle } from "../../redux/actions/authActions";
import SpinLoader from "../utils/spinLoader/SpinLoader";

const initial_state = {
  name: "",
  email: "",
  password: "",
};

export default function Signup() {
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
    if (form.name !== "" && form.email !== "" && form.password !== "") {
      dispatch(signup(form, navigate, setLoading));
    }
  };

  const googleSignup = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  async function handleGoogleLoginSuccess(tokenResponse) {
    setLoading(2);
    const accessToken = tokenResponse.access_token;
    dispatch(signupGoogle(accessToken, navigate, setLoading));
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Create your account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          ></input>
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
          {loading !== 1 && <input type="submit" value="Signup"></input>}
          {loading === 1 && (
            <div className="auth-load-btn">
              <SpinLoader height={25} width={25} color="white" />
            </div>
          )}
        </form>
        <div className="auth-actions">
          <div
            className="registered-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already Registered? Login.
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
          <i className="fa-brands fa-google"></i> Sign up with google
        </div>
      </div>
    </div>
  );
}
