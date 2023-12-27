import React, { useState } from "react";
import "./navbar.css";
import logo from "../../images/logo.svg";
import { useSelector } from "react-redux";

export default function Navbar({ openSidebar, setOpenSidebar }) {
  const user = useSelector((state) => state.user);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);

  return (
    <div className="navbar">
      <div className="nav-logo">
        {/* <div
          className="sidebar-btn"
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </div> */}
        <img src={logo} alt="Canva"></img>
      </div>
      <div className="nav-menu">
        <div className="nav-create-btn">
          <span className="nav-create-text">Create&nbsp;</span>
          <i className="fa-solid fa-plus"></i>
        </div>
        <div style={{ position: "relative" }}>
          <div
            className="nav-profile-btn"
            onClick={() => {
              setOpenProfileDropdown(!openProfileDropdown);
            }}
          >
            <i className="fa-regular fa-user"></i>
          </div>

          {openProfileDropdown && (
            <div className="nav-profile-dropdown">
              <div className="nav-profile-loggedin">
                <div className="profile-dropdown-top">
                  <div className="profile-dropdown-img"></div>
                  <div className="profile-dropdown-name">{user.name}</div>
                </div>
                <div className="profile-dropdown-bottom">
                  <div className="profile-dropdown-item">
                    <i class="fa-solid fa-gear"></i>Settings
                  </div>
                  <div className="profile-dropdown-item">
                    <i class="fa-solid fa-headphones"></i>Get Help
                  </div>
                  <div className="profile-dropdown-item">
                    <i class="fa-solid fa-gift"></i>Refer a Friend
                  </div>
                  <div className="profile-dropdown-item">
                    <i class="fa-solid fa-power-off"></i>Signout
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
