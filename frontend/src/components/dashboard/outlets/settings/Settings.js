import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./settings.css";
import * as api from "../../../../api/userAPI";
import { DarkTheme, LightTheme } from "../../../../utils/icons";
import SpinLoader from "../../../../utils/SpinLoader";

export default function Settings() {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState("");
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });
  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  async function updateProfilePic(imgFile) {
    const image_url = await api.uploadProfilePhotoInCloudinary(
      user._id,
      imgFile
    );
    const { data } = await api.updateUser({
      profile_pic: image_url,
    });
    if (data.success) {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          profile_pic: image_url,
        },
      });
      setLoading(false);
    } else {
      alert(data.message);
      setLoading(false);
    }
  }
  async function updateProfileName() {
    const { data } = await api.updateUser({ name: userData.name });
    if (data.success) {
      dispatch({
        type: "UPDATE_USER",
        payload: { name: data.name },
      });
    } else {
      alert(data.message);
    }
    setLoading(false);
    setEdit("");
  }

  async function removeProfilePic() {
    setLoading("removing");
    const { data } = await api.updateUser({
      profile_pic: "",
    });
    if (data.success) {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          profile_pic: "",
        },
      });
      setLoading(false);
    } else {
      alert(data.message);
      setLoading(false);
    }
  }
  const nameInitials = user.name.charAt(0);
  return (
    <div className="settings">
      <div className="settings-title">Your account</div>
      <div className="settings-item-photo">
        <div className="settings-photo">
          {user.profile_pic && <img src={user.profile_pic}></img>}
          {!user.profile_pic && nameInitials}
        </div>
        <div>
          <div className="settings-item-title">
            <div className="settings-item-title-text">
              {/* {!user.profile_pic && "Upload you profile photo"} */}
            </div>
            <div className="settings-photo-btns">
              {user.profile_pic && (
                <div
                  className="btn-2"
                  onClick={() => {
                    removeProfilePic();
                  }}
                >
                  {loading === "removing" ? (
                    <SpinLoader height={16} width={16} color="black" />
                  ) : (
                    "Remove Photo"
                  )}
                </div>
              )}
              <label
                className="btn-2"
                onClick={() => {
                  document
                    .querySelector(".settings-profile-photo-input")
                    .click();
                }}
              >
                {loading === "img" && (
                  <SpinLoader height={16} width={16} color="black" />
                )}
                {loading !== "img" &&
                  (user.profile_pic ? "Change Photo" : "Upload Photo")}
              </label>
              <input
                type="file"
                onChange={(e) => {
                  setLoading("img");
                  updateProfilePic(e.target.files[0]);
                }}
                className="settings-profile-photo-input"
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-item-name">
        <div className="settings-item-title">Name</div>
        <div className="settings-item-value">
          <div className="settings-item-value-value">
            <input
              className="settings-item-value-input"
              value={userData.name}
              onChange={(e) => {
                setUserData({
                  name: e.target.value,
                  email: userData.email,
                });
              }}
              disabled={edit !== "name"}
            ></input>
          </div>

          {edit !== "name" && (
            <div className="settings-item-actions">
              <button
                className="btn-2"
                onClick={() => {
                  setEdit("name");
                }}
              >
                Edit
              </button>
            </div>
          )}
          {edit === "name" && (
            <div className="settings-item-actions">
              <button
                className="btn-2"
                onClick={() => {
                  setEdit("");
                  setUserData({
                    name: user.name,
                    email: user.email,
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="btn-1"
                onClick={() => {
                  setLoading("name");
                  updateProfileName();
                }}
              >
                {loading === "name" ? (
                  <SpinLoader height={16} width={16} color="black" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="settings-item-name">
        <div className="settings-item-title">Email</div>
        <div className="settings-item-value">
          <div className="settings-item-value-value">
            <input
              className="settings-item-value-input"
              value={userData.email}
              disabled
            ></input>
          </div>
        </div>
      </div>
      <div className="settings-title">Theme</div>
      <div className="theme-options">
        <div
          className="theme-option"
          onClick={() => {
            dispatch({ type: "CHANGE_THEME", payload: "light" });
          }}
        >
          <div className="theme-img">
            <LightTheme />
          </div>
          <div className="theme-name">Light</div>
        </div>
        <div
          className="theme-option"
          onClick={() => {
            dispatch({ type: "CHANGE_THEME", payload: "dark" });
          }}
        >
          <div className="theme-img">
            <DarkTheme />
          </div>
          <div className="theme-name">Dark</div>
        </div>
      </div>
      <div className="settings-title">Security</div>
      <div className="settings-item-signout">
        <div className="settings-item-title">
          Signout
          <button
            className="settings-signout-btn"
            onClick={() => {
              localStorage.removeItem("Canva_User");
              window.location.href = "/login";
            }}
          >
            Signout
          </button>
        </div>
      </div>
      <div className="settings-item-delete-acc">
        <div className="settings-item-title">
          Delete Account
          <button className="delete-acc-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}
