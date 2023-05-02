import React, { Fragment, useState } from "react";
import { forgotPassword } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ForgotPassword = ({ forgotPassword }) => {
  const [formdata, setFormdata] = useState({
    mobile: "",
  });
  let dt = new Date();

  const { mobile } = formdata;

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile) {
      forgotPassword(mobile);
      setFormdata({
        mobile: "",
      });
    }
  };

  return (
    <Fragment>
      <div className="login-wrapper">
        <div className="login-screen">
          <div className="bg-login" />
          <div className="title">
            Forgot Password
          </div>
          <div className="subtitle">Must be registered with HFM</div>

          <form
            className="login-form insta-an"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="inpt-group">
              <label>Ph Number</label>
              <input
                id="mobile"
                type="text"
                name="mobile"
                value={mobile}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button className="btn big">Submit</button>
          </form>
          <div className="helper-texts">
            <a href="/login">Go Back To Login</a>
          </div>

          <div className="footer-text">
            Copyright© {dt.getFullYear()} infomatric.
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  forgotPassword,
})(ForgotPassword);
