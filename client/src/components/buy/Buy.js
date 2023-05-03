import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLatestReport } from "../../actions/goldApi";
import PaymentGateway from "../paymentGateway/PaymentGateway"

const Buy = ({ getLatestReport, handleBuyClose }) => {
  const [data, setData] = useState(null);
  const [formdata, setFormdata] = useState({
    val: "",
    price: "",
  });
  const { val, price } = formdata;

  useEffect(() => {
    getLatestReport().then((d) => {
      setData(d);
    });
  }, [getLatestReport]);

  const handleChange = (e) => {
    if (e.target.name === "val") {
      setFormdata({
        val: e.target.value,
        price: (
          parseFloat(e.target.value) * parseFloat(data && data.price)
        ).toFixed(2),
      });
    }
  };

  const [openPG, setOpenPG] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenPG(true);
  };
  const handleClose = () => {
    setOpenPG(false);
  };

  return (
    <Fragment>
      <div className="buy insta-an">
        <div className="close">
          <i className="fa fa-times" onClick={() => handleBuyClose()} />
        </div>
        <div className="buy-bg" onClick={() => handleBuyClose()} />
        <h1>Buy Premimum Gold</h1>
        <p>Let's Begin the journey to Invest on Gold Digitally.</p>
        <form className="login-form insta-an" onSubmit={(e) => handleSubmit(e)}>
          <div className="inpt-group">
            <label>Enter the Weight in (gm)</label>
            <input
              id="val"
              type="number"
              name="val"
              value={val}
              placeholder={!data ? "Fetching Latest Record..." : ""}
              disabled={!data}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="inpt-group">
            <label>Estimated Price as per Weight</label>
            <input
              id="price"
              type="text"
              name="price"
              value={price}
              disabled={true}
            />
          </div>
          <button className="btn big" type="submit" >Submit</button>
        </form>
      </div>
      {openPG && (
        <PaymentGateway openPG={openPG} amnt={price} wg={val} handleClose={handleClose} />
      )}
    </Fragment>
  );
};

Buy.propTypes = {
  getLatestReport: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  getLatestReport,
})(Buy);
