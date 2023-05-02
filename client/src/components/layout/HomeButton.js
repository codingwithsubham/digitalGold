import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const HomeButton = ({ auth: { isAuthenticated, user } }) => {
  return (
    isAuthenticated &&
    user && (
      <NavLink exact to="/home">
        <div className="hm-btn closebtn">
          <i className="fa fa-home" aria-hidden="true"></i>
        </div>
      </NavLink>
    )
  );
};

HomeButton.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(HomeButton);
