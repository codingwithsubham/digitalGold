import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUserBank } from "../../actions/auth";

const BankDetails = ({ auth: { user }, updateUserBank }) => {
  const [editBank, setEditBank] = useState(false);
  const [formData, setFormData] = useState({
    acnum: user?.bankDetails?.acnum ? user?.bankDetails?.acnum : "",
    ifsc: user?.bankDetails?.ifsc ? user?.bankDetails?.ifsc : "",
    bankName: user?.bankDetails?.bankName ? user?.bankDetails?.bankName : "",
  });

  const { acnum, ifsc, bankName } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      bankDetails: formData,
    };
    updateUserBank({user});
    setEditBank(false);
  };

  if (user?.bankDetails && !editBank) {
    return (
      <Fragment>
        <div className="kyc-data insta-an">
          <div className="prsnl-details bnk-dtls">
          <i className="fa fa-pencil" onClick={() => setEditBank(!editBank)}></i>
            <h1>Bank Details</h1>
            <p>
              <strong>Bank Name:</strong>
              {user?.bankDetails?.bankName}
            </p>
            <p>
              <strong>A/c No:</strong>
              {user?.bankDetails?.acnum}
            </p>
            <p>
              <strong>IFSC Code:</strong>
              {user?.bankDetails?.ifsc}
            </p>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="kyc-form insta-an bnk-dtls">
      <form onSubmit={(e) => handleSubmit(e)} className="login-form">
      <h1>Bank Details</h1>
        <div className="inpt-group">
          <label>A/c No</label>
          <input
            id="acnum"
            type="number"
            name="acnum"
            value={acnum}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inpt-group">
          <label>IFSC Code</label>
          <input
            id="ifsc"
            type="text"
            name="ifsc"
            value={ifsc}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="inpt-group">
          <label>Bank Name</label>
          <input
            id="bankName"
            type="text"
            name="bankName"
            value={bankName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  );
};

BankDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUserBank: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateUserBank,
})(BankDetails);
