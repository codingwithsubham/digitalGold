import React, { useState } from "react";
import KYCForm from "./KYCForm";
import KYCData from "./KYCData";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { b64toBlob } from "../../actions/common";
import PersonalData from "./PersonalData";

const Profile = ({ auth: { user } }) => {
  const [openKyc, setOpenKyc] = useState(false);
  const [openPersonal, setOpenPersonal] = useState(false);
  const [openKycEdit, setOpenKycEdit] = useState(false);

  const handleEditKyc = () => {
    setOpenKycEdit(!openKycEdit);
    setOpenKyc(!openKyc);
    setOpenPersonal(!openPersonal);
  };

  let blobUrl = "";
  if (user?.kycData?.profile_image) {
    const profileImage = user?.kycData?.profile_image;
    const contentType = "image/png";
    const blob = b64toBlob(profileImage, contentType);
    blobUrl = URL.createObjectURL(blob);
  }

  return (
    <div className="profile">
      <div className="prfile-hdr">
        <div className="avatar">
          {user?.kycData?.profile_image ? (
            <img src={blobUrl} alt="" />
          ) : (
            <i className="fa fa-user-circle"></i>
          )}
        </div>
        <div className="dtls">
          <h2>{user?.name}</h2>
          <h3>Mobile: {user?.mobile}</h3>
          <p>Age: {user?.age}</p>
        </div>
      </div>
      <div className="prfile-bdy">
        <div className="bdy-itm" onClick={() => setOpenKyc(!openKyc)}>
          <i className="fa fa-shield"></i>
          <p>KYC Details</p>
        </div>
        <div className="bdy-itm" onClick={() => setOpenPersonal(!openPersonal)}>
          <i className="fa fa-user"></i>
          <p>Personal Details</p>
        </div>
      </div>
      <div className="prfile-dtls">
        {openKycEdit && <KYCForm handleEditKyc={handleEditKyc} />}
        {openKyc && <KYCData handleEditKyc={handleEditKyc} />}
        {openPersonal && <PersonalData handleEditKyc={handleEditKyc} />}
      </div>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Profile);
