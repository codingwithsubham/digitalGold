import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const InstaAlert = ({ instaAlert }) => {
  return (
    instaAlert !== null &&
    instaAlert.length > 0 &&
    instaAlert.map((alert) => (
      <div className="insta-alert animate-fade">
        <div key={alert.id} className="insta-alert-container">
          {alert.type === "fail" ? (
            <img src={require("../../static/sad.gif")} alt="" />
          ) : (
            <img src={require("../../static/confirm.gif")} alt="" />
          )}
          {alert.msg}
        </div>
      </div>
    ))
  );
};

InstaAlert.propTypes = {
  instaAlert: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  instaAlert: state.instaAlert,
});

export default connect(mapStateToProps)(InstaAlert);
