import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLatestReport } from "../../actions/goldApi";
import { getVault } from "../../actions/vault";
import { setAlert } from "../../actions/alert";
import {sellGold} from "../../actions/sell"

const Sell = ({
  getLatestReport,
  handleSellClose,
  getVault,
  vault: { myVault },
  setAlert,
  sellGold,
}) => {
  const [data, setData] = useState(null);
  const [formdata, setFormdata] = useState({
    val: "",
    price: "",
  });
  const { val, price } = formdata;

  useEffect(() => {
    getVault();
    getLatestReport().then((d) => {
      setData(d);
    });
  }, [getLatestReport, getVault]);

  const handleChange = (e) => {
    if (e.target.name === "val") {
      if (e.target.value > parseFloat(myVault?.vaultBalance)) {
        setAlert("Can't sell more than you have !!");
      } else {
        setFormdata({
          val: e.target.value,
          price: (
            parseFloat(e.target.value) * parseFloat(data && data.price)
          ).toFixed(2),
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sellGold(formdata);
    handleSellClose();
  };

  return (
    <Fragment>
      <div className="buy insta-an">
        <div className="close">
          <i className="fa fa-times" onClick={() => handleSellClose()} />
        </div>
        <div className="buy-bg" onClick={() => handleSellClose()} />
        <h1>Sell Your Gold</h1>
        <p>Let's Begin the journey to sell Gold Digitally.</p>
        <p className="avl-blnc">Available Balance <strong>{myVault?.vaultBalance}g.</strong></p>
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
          <button className="btn big" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

Sell.propTypes = {
  getLatestReport: PropTypes.func.isRequired,
  getVault: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  sellGold: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  vault: state.vault,
});

export default connect(mapStateToProps, {
  getLatestReport,
  getVault,
  setAlert,
  sellGold,
})(Sell);
