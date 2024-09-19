import React, { useState } from "react";
import "./auth.css";
import email_icon from "../../images/email_icon.svg";
import google_logo from "../../images/google_logo.svg";
import { LeftArrowIcon2 } from "../../utils/icons";

import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../redux/actions/authActions";

import * as api from "../../api/authAPI";
import SpinLoader from "../../utils/SpinLoader";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(0);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userExist, setUserExist] = useState(false);

  const handleEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setErr(true);
    } else {
      const res = await api.checkEmail(email);
      // login with code
      if (res.email_exist) {
        setUserExist(true);
        setPage(4);
      }
      // create account
      else {
        setUserExist(false);
        setPage(5);
      }
    }
    setLoading(false);
  };
  const handleCode = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!code) {
      setErr(true);
    } else {
      const res = await api.verifyCode({
        email,
        code,
        name,
        method: userExist ? "login" : "signup",
      });
      if (res.success) {
        localStorage.setItem("Canva_User", res.token);
        navigate("/");
      }
    }
    setLoading(false);
  };

  const handleName = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!name) {
      setErr(true);
    } else {
      const res = await api.sendVerificationCode(email);
      if (res.success) {
        setPage(4);
      } else {
        alert(res.message);
      }
    }
    setLoading(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleSignup = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  async function handleGoogleLoginSuccess(tokenResponse) {
    setLoading(true);
    const accessToken = tokenResponse.access_token;
    dispatch(googleAuth(accessToken, navigate, setLoading));
  }

  return (
    <div className="auth-page">
      <div className="auth-bg-img">
        <img
          src="https://res.cloudinary.com/dg1awjvew/image/upload/v1722141209/canva/resources/auth-bg.jpg"
          alt=""
        ></img>
      </div>
      <div className="auth-bg-darken"></div>
      <div className="auth-box">
        {page === 1 && (
          <div className="auth-page-1">
            <div className="auth-title">Log in or sign up in seconds</div>
            <div className="auth-para">
              Use your email to continue with Canva
            </div>
            <div className="auth-btns">
              <div className="auth-btn-1" onClick={googleSignup}>
                <div className="auth-btn-icon">
                  <img src={google_logo}></img>
                </div>
                Continue with Google
              </div>
              <div
                className="auth-btn-1"
                onClick={() => {
                  setPage(2);
                  setErr(false);
                  setEmail("");
                }}
              >
                <div className="auth-btn-icon">
                  <img src={email_icon}></img>
                </div>
                Continue with email
              </div>
            </div>
            <div className="auth-terms">
              By continuing, you agree to Canva's Terms of Use. Read our Privacy
              Policy.
            </div>
          </div>
        )}
        {page === 2 && (
          <div className="auth-page-2">
            <div className="auth-title">
              <div
                className="auth-back-btn"
                onClick={() => {
                  setPage(1);
                }}
              >
                <LeftArrowIcon2 />
              </div>
              Continue with email
            </div>
            <div className="auth-para">
              We'll check if you have an account, and help create one if you
              don't.
            </div>
            <div className="auth-label">Email address</div>
            <form className="email-form" onSubmit={handleEmail}>
              <input
                type="email"
                placeholder="julie@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErr(false);
                }}
                style={{ borderColor: err && "red" }}
                className="auth-input"
              ></input>
              {err && <div className="err-box">You missed this one</div>}
              {!loading && (
                <input
                  type="submit"
                  value="Continue"
                  className="auth-submit-btn"
                ></input>
              )}
              {loading && (
                <div className="auth-submit-btn">
                  <SpinLoader height={12} width={12} color="white" />
                </div>
              )}
            </form>
          </div>
        )}
        {page === 4 && (
          <div className="auth-page-4">
            <div className="auth-title">
              <div
                className="auth-back-btn"
                onClick={() => {
                  setPage(2);
                }}
              >
                <LeftArrowIcon2 />
              </div>
              Let us know it's you
            </div>
            <div className="auth-para">
              Last step! To secure your account, enter the code we just sent to{" "}
              {email}
            </div>
            <div className="auth-label">Code</div>
            <form className="email-form" onSubmit={handleCode}>
              <input
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setErr(false);
                }}
                style={{ borderColor: err && "red" }}
                className="auth-input"
              ></input>
              {err && <div className="err-box">You missed this one</div>}
              {!loading && (
                <input
                  type="submit"
                  value="Continue"
                  className="auth-submit-btn"
                ></input>
              )}
              {loading && (
                <div className="auth-submit-btn">
                  <SpinLoader height={12} width={12} color="white" />
                </div>
              )}
            </form>
          </div>
        )}
        {page === 5 && (
          <div className="auth-page-5">
            <div className="auth-title">
              <div
                className="auth-back-btn"
                onClick={() => {
                  setPage(2);
                }}
              >
                <LeftArrowIcon2 />
              </div>
              Create your account
            </div>
            <div className="auth-para">
              You're creating a Canva account with {email}
            </div>
            <div className="auth-label">Name</div>
            <form className="email-form" onSubmit={handleName}>
              <input
                type="text"
                placeholder="Julie Smith"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErr(false);
                }}
                className="auth-input"
              ></input>
              {err && <div className="err-box">You missed this one</div>}
              {!loading && (
                <input
                  type="submit"
                  value="Continue"
                  className="auth-submit-btn"
                ></input>
              )}
              {loading && (
                <div className="auth-submit-btn">
                  <SpinLoader height={12} width={12} color="white" />
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
