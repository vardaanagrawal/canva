import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import logo from "../../images/logo.svg";
import { useSelector } from "react-redux";

export default function Navbar({ openSidebar, setOpenSidebar }) {
  const user = useSelector((state) => state.user);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        // Clicked outside the container, so close it
        setOpenProfileDropdown(false);
      }
    };

    // Attach the event listener to the whole document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <div className="nav-profile-dropdown" ref={containerRef}>
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
