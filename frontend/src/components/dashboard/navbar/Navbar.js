import React, { useRef, useState } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import logo from "../../../images/logo.svg";
import SpinLoader from "../../utils/spinLoader/SpinLoader";
// functions
import { createNewProject } from "../../../redux/actions/projectActions";

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

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Canva"></img>
      </div>
      <div className="nav-menu">
        <div style={{ position: "relative" }}>
          <div
            className="nav-create-btn"
            ref={cbRef}
            onClick={() => {
              setCreateDropdown(!createDropdown);
            }}
          >
            <span className="nav-create-text">Create a design</span>
            <i className="fa-solid fa-plus"></i>
          </div>
          {createDropdown && <CreateDropdown cdRef={cdRef} />}
        </div>
        <div style={{ position: "relative" }}>
          <div
            className="nav-profile-btn"
            ref={pbRef}
            onClick={() => {
              setProfileDropdown(!profileDropdown);
            }}
          >
            <i className="fa-regular fa-user"></i>
          </div>
          {profileDropdown && <ProfileDropdown pdRef={pdRef} />}
        </div>
      </div>
    </div>
  );
}

const newProjectsList = [
  {
    name: "Document (Landscape)",
    height: 500,
    width: 750,
    bg_color: "#ffffff",
  },
  {
    name: "Document (Portrait)",
    height: 500,
    width: 350,
    bg_color: "#ffffff",
  },
  {
    name: "Document (Square)",
    height: 400,
    width: 400,
    bg_color: "#ffffff",
  },
];

function CreateDropdown({ cdRef }) {
  const projects = useSelector((state) => state.projects);
  const [loading, setLoading] = useState(-1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleCreateNewProject(item) {
    const newProjectData = {
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
    };
    dispatch(createNewProject(newProjectData, navigate, setLoading));
  }

  return (
    <div className="nav-create-dropdown" ref={cdRef}>
      <div className="create-dd-title">Create Blank Design</div>
      <div className="create-dd-projects-list">
        {newProjectsList.map((item, index) => (
          <div
            className="create-dd-project"
            key={index}
            onClick={() => {
              setLoading(index);
              handleCreateNewProject(item);
            }}
          >
            {loading !== index && <div className="create-dd-project-img"></div>}
            {loading === index && (
              <div
                style={{
                  width: "35px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <SpinLoader height={15} width={15} color="black" />
              </div>
            )}
            <div className="create-dd-project-name">{item.name}</div>
          </div>
        ))}
      </div>
      {projects.length > 0 && (
        <div className="create-dd-title">Copy Existing Design</div>
      )}
      {projects.length > 0 && (
        <div className="create-dd-projects-list">
          {projects.map((item, index) => (
            <div className="create-dd-project" key={item._id}>
              <div className="create-dd-project-img"></div>
              <div className="create-dd-project-name">{item.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileDropdown({ pdRef }) {
  const user = useSelector((state) => state.user);
  return (
    <div className="nav-profile-dropdown" ref={pdRef}>
      <div className="profile-dropdown-top">
        <div className="profile-dropdown-img"></div>
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
        <div className="profile-dropdown-item">
          <i className="fa-solid fa-gear"></i>Settings
        </div>
        <div className="profile-dropdown-item">
          <i className="fa-solid fa-headphones"></i>Get Help
        </div>
        <div className="profile-dropdown-item">
          <i className="fa-solid fa-gift"></i>Refer a Friend
        </div>
        <div className="profile-dropdown-item">
          <i className="fa-solid fa-power-off"></i>Signout
        </div>
      </div>
    </div>
  );
}
