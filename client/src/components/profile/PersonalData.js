import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PersonalData = ({ auth: { user }, handleEditKyc }) => {
  return user && user.kyc ? (
    <div className="kyc-data">
      <div className="prsnl-details">
        <h1>Personal Details: </h1>
      <p>
             <strong>Full Name:</strong>
             {user?.kycData?.full_name}
           </p>
           <p>
             <strong>Date of Birth:</strong>
             {user?.kycData?.dob}
           </p>
           <p>
             <strong>Gender:</strong>
             {user?.kycData?.gender}
           </p>
           <p>
             <strong>Care Of:</strong>
             {user?.kycData?.care_of}
           </p>
        <h1>Address: </h1>
        {Object.entries(user?.kycData?.address).map(([key, value]) => (
             <p key={key}>
             <strong>{key}:</strong>
             {value}
           </p>
            ))}
            <p>
             <strong>Pin Code:</strong>
             {user?.kycData?.zip}
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

PersonalData.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PersonalData);
