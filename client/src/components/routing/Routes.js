import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";
import Alert from "../layout/Alert";
import ScrollToTop from "../../ScrollToTop";
import PrivateRoute from "./PrivateRoute";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import ResetPassword from "../auth/ResetPassword";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import AboutUs from "../pages/AboutUs";
import Vault from "../vault/Vault";

const Routes = ({ layout: { isSidebarOpen } }) => {
  return (
    <div
      id="main"
      style={isSidebarOpen ? { marginLeft: "20%" } : { marginLeft: "0%" }}
    >
      <Alert />
      <ScrollToTop />
      <Switch>
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/reset-password" component={ResetPassword} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/vault" component={Vault} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/terms-conditions" component={TermsConditions} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  layout: state.layout,
});

export default connect(mapStateToProps, {})(Routes);
