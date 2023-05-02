import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { Link } from "react-router-dom";

const BottomBar = ({auth: { isAuthenticated, user }, loadUser}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return isAuthenticated && user && (
    <div className="btm-bar">
      <div className="btm-bar-wrap">
          <Link to="/">
            <i className="fa fa-home"></i>
            <div className="btm-txt">Home</div>
          </Link>
          <Link to="/">
            <i className="fa fa-paper-plane"></i>
            <div className="btm-txt">Sell</div>
          </Link>
          <Link to="/create-post">
            <i className="fa fa-download"></i>
            <div className="btm-txt">Buy</div>
          </Link>
          <Link to="/">
            <i className="fa fa-exchange"></i>
            <div className="btm-txt">Transfer</div>
          </Link>
          <Link to="/profile">
            <i className="fa fa-user"></i>
            <div className="btm-txt">Profile</div>
          </Link>
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
