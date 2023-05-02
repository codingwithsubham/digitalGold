import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser, logout } from "../../actions/auth";
import { useLocation } from "react-router-dom";
import { closeSidebar, openSidebar } from "../../actions/layout";
//import { Link } from "react-router-dom";

const Navbar = ({
  auth: { isAuthenticated, user },
  layout: { isSidebarOpen },
  loadUser,
  logout,
  openSidebar,
  closeSidebar,
}) => {
  const [navStyle, setNavStyle] = useState("");
  const listenScrollEvent = (e) => {
    if (window.scrollY > 0) {
      setNavStyle("stickey");
    } else {
      setNavStyle("");
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("scroll", listenScrollEvent);
  }, [loadUser]);

  const location = useLocation();
  let pathname = location.pathname;
  let rawPath = pathname.split("/")[1];

  return (
    isAuthenticated &&
    user && (
      <div
        id="myNavbar"
        className={`navbar ${navStyle}`}
        style={isSidebarOpen ? { marginLeft: "20%" } : { marginLeft: "0%" }}
      >
        <div className="nav-left">
          <div className="menu">
            <button
              className="closebtn"
              style={isSidebarOpen ? { right: "-25px" } : { right: "-55px" }}
              onClick={() => (isSidebarOpen ? closeSidebar() : openSidebar())}
            >
              {isSidebarOpen ? "×" : "☰"}
            </button>
          </div>
          <div className="logo">
            {rawPath === "home" ? (
              navStyle === "" ? (
                <div className="welcome insta-slide-down">
                  <div className="nm">Hello {user.name.split(" ")[0]}</div>
                  Welcome Back!
                </div>
              ) : (
                <img
                  src={require("../../static/scr.png")}
                  alt=""
                  className="insta-slide-up"
                />
              )
            ) : (
              <div style={{ textTransform: "uppercase" }}>{rawPath}</div>
            )}
          </div>
        </div>
        <div className="nav-right">
          <div className="user notification">
            <i className="fa fa-bell" aria-hidden="true"></i>
            <div className="dropdown-content">
              <div className="notification">
                <div className="notification-item">It's a Notification</div>
                <div className="notification-item">It's a Notification</div>
                <div className="notification-item">It's a Notification</div>
              </div>
            </div>
          </div>
          <div className="user">
            <i className="fa fa-user" aria-hidden="true"></i>
            <div className="dropdown-content">
              <p onClick={() => logout()}>Logout</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  layout: state.layout,
});

export default connect(mapStateToProps, {
  loadUser,
  logout,
  closeSidebar,
  openSidebar,
})(Navbar);
