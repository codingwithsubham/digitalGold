import React, { useState } from "react";
import { requestPaymentGateway } from "../../actions/pg";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PaymentGateway = ({
  openPG,
  amnt,
  requestPaymentGateway,
  handleClose,
}) => {
  const [paymentLink, setPaymentLink] = useState("");

  if (!paymentLink && openPG) {
    requestPaymentGateway(amnt).then((res) => {
      setPaymentLink(res?.data?.payment_url);
      window.location.href = res?.data?.payment_url;
    });
  }

  return (
    <div className="pg-styl">
      <div className="pg-popup">
        <div className="pg-element">
          <div className="close-icon" onClick={handleClose}>
            X
          </div>
          <p>Payment Initiated. Do not Close or Go Back.</p>
        </div>
      </div>
    </div>
  );
};

PaymentGateway.propTypes = {
  requestPaymentGateway: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, { requestPaymentGateway })(
  PaymentGateway
);
