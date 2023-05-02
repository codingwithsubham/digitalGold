import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const KYCData = ({ auth: { user }, handleEditKyc }) => {
  return user && user.kyc ? (
    <div className="kyc-data">
      <i className="fa fa-check success"></i>
      <p>Profile Verified</p>
      <div className="details">
        <p>
          <strong>Aadhar No:</strong>
          {user?.kyc?.aadhaar}
        </p>
        <p>
          <strong>PAN No:</strong>
          {user?.kyc?.pan}
        </p>
      </div>
    </div>
  ) : (
    <div className="kyc-data">
      <i className="fa fa-ban danger"></i>
      <p>You haven't Added Your KYC Details !!</p>
      <button className="btn" onClick={() => handleEditKyc()}>
        Add Now
      </button>
    </div>
  );
};

KYCData.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(KYCData);
