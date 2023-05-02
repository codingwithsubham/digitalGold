import React, { Fragment, useState } from "react";
import { resetPassword } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ResetPassword = ({ resetPassword }) => {
  const [formdata, setFormdata] = useState({
    password: "",
    confPass: "",
  });
  const [type, SetType] = useState(false);
  const [error, SetError] = useState("");
  const { password, confPass } = formdata;
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    SetError("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confPass) {
      resetPassword(password);
    } else {
      SetError("Password Does Not Match !!");
    }
  };
  return (
    <Fragment>
      <div className="login-wrapper">
        <div className="login-screen">
          <h1>Enter a New Password</h1>
          <form
            className="login-form insta-an"
            onSubmit={(e) => handleSubmit(e)}
          >
            {error && (
              <div className="error insta-slide">
                {error} !! Please Enter Again !!
              </div>
            )}
            <div className="inpt-group">
              <label>Password</label>
              <input
                id="password"
                type={type ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
              <span onClick={() => SetType(!type)}>
                <i className="fa fa-eye"></i>
              </span>
            </div>
            <div className="inpt-group">
              <label>Confirm Password</label>
              <input
                id="confPass"
                type={type ? "text" : "password"}
                name="confPass"
                value={confPass}
                onChange={(e) => handleChange(e)}
              />
              <span onClick={() => SetType(!type)}>
                <i className="fa fa-eye"></i>
              </span>
            </div>
            <button className="btn big">Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  resetPassword,
})(ResetPassword);
