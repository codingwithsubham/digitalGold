import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { getLatestReport } from "../../actions/goldApi";
import { openSidebar } from "../../actions/layout";
import Buy from "../buy/Buy";

const Home = ({ auth: { user }, loadUser, getLatestReport }) => {
  useEffect(() => {
    loadUser();
    getLatestReport().then((d) => {
      setData(d);
    });
  }, [loadUser, getLatestReport]);
  const [data, setData] = useState(null);

  const refreshRate = () => {
    setData(null);
    getLatestReport().then((d) => {
      setData(d);
    });
  };

  const [openBuy, setOpenBuy] = useState(false);

  const handleBuyClose = () => {
    setOpenBuy(false);
  }

  return (
    <Fragment>
      <div className="hme insta-an">
        <div className="hro">
          <p>Live Digital GOLD as per MMTC PAMP.</p>
          <h3>{data ? `₹${data.price}` : "Loading..."}</h3>
          <p>{data ? `For ${data.wg} GOLD + 3% GST applicable` : ""}</p>
          <div className="sub-hro">
            <i className="fa fa-dot-circle-o dot blink"></i>
            <h4 className="blink">24K Live Rate Updated</h4>
          </div>
        </div>
        <div className="cta">
          <div className="itm">
            <i className="fa fa-paper-plane" />
            <p>Sell</p>
          </div>
          <div className="itm" onClick={() => setOpenBuy(!openBuy)}>
            <i className="fa fa-download" />
            <p>Buy</p>
          </div>
          <div className="itm">
            <i className="fa fa-exchange" />
            <p>Transfer</p>
          </div>
          <div className="itm" onClick={() => refreshRate()}>
            <i className="fa fa-refresh" />
            <p>Refresh</p>
          </div>
        </div>
        <div className="lsts">
          <div className="card">
            <i className="fa fa-chevron-right"></i>
            <h4>Here is your Digital Gold Vault</h4>
            <h1>0.01g</h1>
            <h3>Vault is secure than You Think !!</h3>
          </div>
        </div>
      </div>
      {openBuy && <Buy  handleBuyClose={handleBuyClose} />}
    </Fragment>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
  getLatestReport: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  openSidebar,
  loadUser,
  getLatestReport,
})(Home);
