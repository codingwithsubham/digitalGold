import React, { useState, useEffect, Fragment } from "react";
import { loadUser, register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Register = ({
  loadUser,
  register,
  auth: { loading, user, isAuthenticated },
  setAlert,
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    age: "",
    role: ["user"],
  });

  const { name, age, password, confirmPassword, mobile } = formData;

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age) {
      register(formData);
    }
  };

  const goPrev = () => {
    const newStep = step <= 1 ? 1 : step - 1;
    setStep(newStep);
  };

  const goNext = () => {
    if (name) {
      setStep(2);
    }
    if (mobile && password && password === confirmPassword) {
      setStep(3);
    } else setAlert("Password Doesnot Match", "danger");
  };

  let dt = new Date();

  if (user && isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-screen">
        <div className="bg-login" />
        <div className="title">Before We Start</div>
        <div className="subtitle">Let's Get Some Info About You</div>

        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
          {step === 1 && (
            <div className="inpt-group">
              <label>Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}
          {step === 2 && (
            <Fragment>
              <div className="inpt-group">
                <label>mobile</label>
                <input
                  id="mobile"
                  type="text"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="inpt-group">
                <label>Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="inpt-group">
                <label>Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </Fragment>
          )}
          {step === 3 && (
            <Fragment>
              <div className="inpt-group">
                <label>Age</label>
                <input
                  id="age"
                  type="text"
                  name="age"
                  value={age}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </Fragment>
          )}
          {step === 3 && (
            <Fragment>
              <button className="btn big" type="submit">
                Finish
              </button>
              <div onClick={() => goPrev()}>← Go Back</div>
            </Fragment>
          )}
        </form>
        {step !== 3 && (
          <div className="multi-buttons">
            <button className="btn big" onClick={() => goPrev()}>
              Prev
            </button>
            <button className="btn big" onClick={() => goNext()}>
              Next
            </button>
          </div>
        )}
        <div className="footer-text">
          Copyright© {dt.getFullYear()} infomatric.
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
  setAlert,
  register,
})(Register);
