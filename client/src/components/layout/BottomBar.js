import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { NavLink } from "react-router-dom";

const BottomBar = ({auth: { isAuthenticated, user }, loadUser}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return isAuthenticated && user && (
    <div className="btm-bar">
      <div className="btm-bar-wrap">
          <NavLink exact to="/home">
            <i className="fa fa-home"></i>
            <div className="btm-txt insta-slide">Home</div>
          </NavLink>
          <NavLink exact to="/vault">
            <i className="fa fa-shield"></i>
            <div className="btm-txt insta-slide">Vault</div>
          </NavLink>
          <NavLink exact to="/profile">
            <i className="fa fa-user"></i>
            <div className="btm-txt insta-slide">Profile</div>
          </NavLink>
        </div>
    </div>
  );
};

BottomBar.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
})(BottomBar);
