import React, { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { closeSidebar, openSidebar } from "../../actions/layout";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const Sidebar = ({
  auth: { isAuthenticated, user },
  layout: { isSidebarOpen },
  closeSidebar,
  openSidebar
}) => {
  const [width] = useWindowSize();

  if(width >= 600){
    if(!isSidebarOpen && isAuthenticated){
      openSidebar();
    }
  }

  const handleCloseSidebar = () => {
    if(width <= 600){
      closeSidebar();
    }
  }
  return (
    isAuthenticated &&
    user && (
      <div
        id="mySidebar"
        className="sidebar"
        style={
          isSidebarOpen
            ? { width: width <= 600 ? "70%" : "20%" }
            : { width: "0%" }
        }
      >
        <div className="sidebar-content">
          {width <= 600 && (
            <button className="sidebar-closebtn" onClick={() => handleCloseSidebar()}>
              x
            </button>
          )}
          <div className="sidebar-header">
            <div className="title">
              <img
                src={require("../../static/scr.png")}
                alt=""
                className="logo fade"
              />
              <p>Digital Gold</p>
            </div>
          </div>
          <div className="sidebar-links">
            <NavLink exact to="/home" onClick={() => handleCloseSidebar()}>
              Home
            </NavLink>
            <NavLink exact to="/profile" onClick={() => handleCloseSidebar()}>
              Profile
            </NavLink>
            <NavLink exact to="/about-us" onClick={() => handleCloseSidebar()}>
              About
            </NavLink>
            <NavLink exact to="/privacy-policy" onClick={() => handleCloseSidebar()}>
              Privacy
            </NavLink>
            <NavLink exact to="/terms-conditions" onClick={() => handleCloseSidebar()}>
              Terms
            </NavLink>
          </div>
        </div>
      </div>
    )
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  layout: state.layout,
});

export default connect(mapStateToProps, { closeSidebar, openSidebar })(Sidebar);
