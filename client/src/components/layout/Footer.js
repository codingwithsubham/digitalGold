import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";

const Footer = ({ auth: { isAuthenticated, user }, loadUser, layout: { isSidebarOpen }  }) => {
  let dt = new Date();
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return isAuthenticated && user && (
    <div className="footer" style={isSidebarOpen ? { marginLeft: "20%", width: "80%" } : { marginLeft: "0%", width: "100%" }}>
      <div className="ftr-txt">
        Created with <i className="fa fa-heart"></i> by Infomatric.
      </div>
      <div className="ftr-cpyryt">
        Copyright© {dt.getFullYear()} Fastdial Credit
      </div>
    </div>
  );
};

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  layout: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  layout: state.layout,
});

export default connect(mapStateToProps, {
  loadUser,
})(Footer);
