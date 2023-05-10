import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVault, transfer } from "../../actions/vault";
import { setAlert } from "../../actions/alert";
import { validateUser } from "../../actions/auth";

const Transfer = ({
  handleTransferClose,
  getVault,
  vault: { myVault },
  setAlert,
  transfer,
  validateUser,
}) => {
  const [formdata, setFormdata] = useState({
    val: "",
    to: "",
  });
  const { val, to } = formdata;
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    getVault();
  }, [getVault]);

  const handleChange = (e) => {
    if (e.target.name === "val") {
      if (e.target.value > parseFloat(myVault? myVault.vaultBalance : 0)) {
        setAlert("Can't transfer more than you have !!");
      } else {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
      }
    } else {
      setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verified) {
      validateUser(to).then((d) => setVerified(d));
    }
    if (verified) {
      transfer({to: verified._id, val: val});
      handleTransferClose();
    }
  };

  return (
    <Fragment>
      <div className="buy insta-an">
        <div className="close">
          <i className="fa fa-times" onClick={() => handleTransferClose()} />
        </div>
        <div className="buy-bg" onClick={() => handleTransferClose()} />
        <h1>Transfer Gold</h1>
        <p className="avl-blnc">
          Available Balance <strong>{myVault?.vaultBalance}g.</strong>
        </p>
        <form className="login-form insta-an" onSubmit={(e) => handleSubmit(e)}>
          <div className="inpt-group">
            <label>Enter the Weight in (gm)</label>
            <input
              id="val"
              type="number"
              name="val"
              value={val}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inpt-group">
            <label>Enter The Mobile Number</label>
            <input
              id="to"
              type="number"
              name="to"
              value={to}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {verified && <p className="success">Name: {verified?.name} ✓</p>}
          <button className="btn big" type="submit">
            {verified ? "Transfer" : "Verify"}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

Transfer.propTypes = {
  getVault: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  transfer: PropTypes.func.isRequired,
  validateUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  vault: state.vault,
});

export default connect(mapStateToProps, {
  getVault,
  setAlert,
  transfer,
  validateUser,
})(Transfer);
