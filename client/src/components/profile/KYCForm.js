import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { initKycVerification, finishKycVerification } from "../../actions/auth";

const KYCForm = ({
  auth: { user },
  initKycVerification,
  finishKycVerification,
  handleEditKyc
}) => {
  const [formdata, setFormdata] = useState({
    aadhaar: "",
    pan: "",
    otp: "",
  });

  const { aadhaar, pan, otp } = formdata;

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (aadhaar && pan) {
      initKycVerification({ aadhaar, pan });
    } else if (otp) {
      finishKycVerification({ otp, client_id: user?.kyc?.client_id });
      handleEditKyc(true);
    }
  };

  const resendOTP = () => {
    initKycVerification({ aadhaar: user?.kyc?.aadhaar, pan: user?.kyc?.pan });
  }

  if(user?.kyc) {
    return (
      <div className="kyc-data insta-an">
      <i className="fa fa-check success"></i>
        <p>Your Kyc is already Verified !!</p>
        <button className='btn' onClick={() => handleEditKyc()}>View Now</button>
    </div>
    )
  }

  return user && (
    <div className="kyc-form insta-an">
      <form onSubmit={(e) => handleSubmit(e)} className="login-form">
        <h1>Goverment Verification</h1>
        {user?.kyc?.client_id && user?.kyc?.status === "pending" ? (
          <Fragment>
            <div className="inpt-group">
              <label>OTP Please</label>
              <input
                id="otp"
                type="number"
                name="otp"
                value={otp}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="re-send" onClick={() => resendOTP()}>Resend-Otp</div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="inpt-group">
              <label>Aadhaar No</label>
              <input
                id="aadhaar"
                type="number"
                name="aadhaar"
                value={aadhaar}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="inpt-group">
              <label>PAN No</label>
              <input
                id="pan"
                type="text"
                name="pan"
                value={pan}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Fragment>
        )}
        <button className="btn" type="submit" style={{ margin: "10px 0px" }}>
          {user?.kyc?.client_id && user?.kyc?.status === "pending" ? "Submit OTP" : "Verify"}
        </button>
      </form>
    </div>
  )
};

KYCForm.propTypes = {
  auth: PropTypes.object.isRequired,
  initKycVerification: PropTypes.func.isRequired,
  finishKycVerification: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  initKycVerification,
  finishKycVerification,
})(KYCForm);
