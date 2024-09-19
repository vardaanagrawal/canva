import React, { useRef, useState } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// components
import SpinLoader from "../../../utils/SpinLoader";
// functions
import { createNewProject } from "../../../redux/actions/x2ProjectsActions";
import { uploadImage } from "../../../redux/actions/x4UploadsActions";
// utils
import { newProjectsList } from "../../../utils/utils";
import {
  CloseIcon,
  CustomSizeIcon,
  LockIcon,
  PlusIcon,
  SettingsIcon,
  UploadIcon,
} from "../../../utils/icons";
import CustomSize from "../utlis/customSize/CustomSize";

export default function Navbar() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [createDropdown, setCreateDropdown] = useState(false);
  const pbRef = useRef(null); // profile button ref
  const pdRef = useRef(null); // profile dropdown ref
  const cbRef = useRef(null); // create button ref
  const cdRef = useRef(null); // create dropdown ref
  const handleClickOutside = (event) => {
    if (
      pdRef.current && // tells us that whether the profile dropdown  is open or not
      !pdRef.current.contains(event.target) && // tells us whether clicked item is profile dropdown or not
      !pbRef.current.contains(event.target) // tells us whether clicked item is profile button or not
    ) {
      setProfileDropdown(false);
    }
    if (
      cdRef.current && // tells us that whether the create dropdown  is open or not
      !cdRef.current.contains(event.target) && // tells us whether clicked item is create dropdown or not
      !cbRef.current.contains(event.target) // tells us whether clicked item is create button or not
    ) {
      setCreateDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  const user = useSelector((state) => state.user);
  const nameInitials = user.name.charAt(0);

  const theme = useSelector((state) => state.theme);

  return (
    <div className={`navbar navbar-${theme}`}>
      {/* logo ############################################################################################################## */}
      <Link to="/" className="nav-logo">
        <img
          src={
            theme === "light"
              ? "https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg"
              : "https://static.canva.com/web/images/856bac30504ecac8dbd38dbee61de1f1.svg"
          }
          alt="Canva"
        ></img>
      </Link>
      {/* right menu ######################################################################################################## */}
      <div className="nav-menu">
        {/* create button ###################################################################################################*/}
        <div style={{ position: "relative" }}>
          <div
            className="btn-1"
            ref={cbRef}
            onClick={() => {
              setCreateDropdown(!createDropdown);
            }}
          >
            Create a design
          </div>
          {createDropdown && <CreateDropdown cdRef={cdRef} />}
        </div>
        {/* profile button ###################################################################################################*/}
        <div style={{ position: "relative" }}>
          <div
            className="nav-profile-btn"
            ref={pbRef}
            onClick={() => {
              setProfileDropdown(!profileDropdown);
            }}
          >
            {user.profile_pic && <img src={user.profile_pic}></img>}
            {!user.profile_pic && nameInitials}
          </div>
          {profileDropdown && (
            <ProfileDropdown
              pdRef={pdRef}
              setProfileDropdown={setProfileDropdown}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CreateDropdown({ cdRef }) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(-1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleCreateNewProject(item) {
    const newProjectData = {
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
      project_type: item.name,
      thumbnail: item.thumbnail,
    };
    await dispatch(createNewProject(newProjectData, navigate));

    setLoading(-1);
  }

  const [custom, setCustom] = useState(false);

  const [uploading, setUploading] = useState();
  async function handleUpload(imgFile) {
    setUploading(true);
    const res = await dispatch(uploadImage(user._id, imgFile));
    navigate("/projects?content=uploads");
    setUploading(false);
  }

  const theme = useSelector((state) => state.theme);

  return !custom ? (
    <div
      className={`nav-create-dropdown nav-create-dropdown-${theme}`}
      ref={cdRef}
    >
      <div className="create-dd-title">Create New Design</div>
      <div className="create-dd-projects-list">
        {[].concat(...Object.values(newProjectsList)).map((item, index) => (
          <div
            className={`create-dd-project create-dd-project-${theme}`}
            key={index}
            onClick={() => {
              setLoading(index);
              handleCreateNewProject(item);
            }}
          >
            {loading !== index && (
              <div className="create-dd-project-img">{item.icon}</div>
            )}
            {loading === index && (
              <div
                style={{
                  width: "35px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <SpinLoader
                  height={15}
                  width={15}
                  color={theme === "light" ? "black" : "white"}
                />
              </div>
            )}
            <div className="create-dd-project-name">{item.name}</div>
            <div className="create-dd-size">
              {item.width}px x {item.height}px
            </div>
          </div>
        ))}
      </div>

      <div
        className="create-dd-title"
        style={{ marginTop: "5px", marginBottom: "0px" }}
      >
        Start creating from your media
      </div>
      <div className="create-dd-foot">
        <div
          className={`create-dd-foot-custom-btn create-dd-foot-custom-btn-${theme}`}
        >
          <div
            className={`create-dd-custom-btn-img create-dd-custom-btn-img-${theme}`}
            onClick={() => {
              setCustom(true);
            }}
          >
            <CustomSizeIcon />
          </div>
          <div className="create-dd-custom-btn-text">Custom Size</div>
        </div>
        <div
          className={`create-dd-foot-custom-btn create-dd-foot-custom-btn-${theme}`}
        >
          <input
            type="file"
            id="create-dd-upload-btn"
            style={{ display: "none" }}
            onChange={(e) => {
              handleUpload(e.target.files[0]);
            }}
          ></input>
          <label
            className={`create-dd-custom-btn-img create-dd-custom-btn-img-${theme}`}
            htmlFor="create-dd-upload-btn"
          >
            {uploading ? (
              <SpinLoader height={20} width={20} color="black" />
            ) : (
              <UploadIcon />
            )}
          </label>
          <div className="create-dd-custom-btn-text">Import File</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="nav-create-dropdown" ref={cdRef}>
      <div
        className="custom-close-btn"
        onClick={() => {
          setCustom(false);
        }}
      >
        <CloseIcon />
      </div>
      <CustomSize />
    </div>
  );
}

function ProfileDropdown({ pdRef, setProfileDropdown }) {
  const user = useSelector((state) => state.user);
  const nameInitials = user.name.charAt(0);
  const [so, setSo] = useState(false);

  const theme = useSelector((state) => state.theme);
  return (
    <div
      className={`nav-profile-dropdown nav-profile-dropdown-${theme}`}
      ref={pdRef}
    >
      <div className="profile-dropdown-top">
        <div className="profile-dropdown-img">
          {user.profile_pic && <img src={user.profile_pic}></img>}
          {!user.profile_pic && nameInitials}
        </div>
        <div className="profile-dropdown-name">
          {user.name}
          <div
            style={{
              fontSize: "x-small",
              fontWeight: "normal",
              marginTop: "5px",
            }}
          >
            {user.email}
          </div>
        </div>
      </div>
      <div className="profile-dropdown-bottom">
        <Link
          to="/settings"
          className={`profile-dropdown-item profile-dropdown-item-${theme}`}
          onClick={() => {
            setProfileDropdown(false);
          }}
        >
          <SettingsIcon />
          Settings
        </Link>
        <div
          className={`profile-dropdown-item profile-dropdown-item-${theme}`}
          onClick={() => {
            setSo(true);
            localStorage.removeItem("Canva_User");
            window.location.href = "/login";
          }}
        >
          {so && <SpinLoader height={16} width={16} color={"black"} />}
          {!so && <LockIcon />}
          Signout
        </div>
      </div>
    </div>
  );
}
