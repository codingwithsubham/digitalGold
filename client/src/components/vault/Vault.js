import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVault } from "../../actions/vault";
import { getReturnsByUser } from "../../actions/sell";

const Vault = ({
  getVault,
  vault: { myVault },
  getReturnsByUser,
  sell: { returns },
}) => {
  useEffect(() => {
    getVault();
    getReturnsByUser();
  }, [getVault, getReturnsByUser]);
  const [toggle, setToggle] = useState(true);

  console.log(returns);

  return (
    <Fragment>
      <div className="vault insta-an">
        <div className="vault-hdr blnc">{myVault?.vaultBalance}g.</div>
        <div className="toggle-bar">
          <h1
            className={toggle ? "toggle" : ""}
            onClick={() => setToggle(!toggle)}
          >
            Passbook
          </h1>
          <h1
            className={!toggle ? "toggle" : ""}
            onClick={() => setToggle(!toggle)}
          >
            Returns
          </h1>
        </div>
        {toggle ? (
          <div className="psbok insta-an">
            <table id="data">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Value</th>
                  <th>Type</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {myVault?.passbook?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.date}</td>
                    <td>{item.value}g.</td>
                    <td>{item.type}</td>
                    <td>{item.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="psbok insta-an">
            <table id="data">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Value</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {returns?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.date}</td>
                    <td>{item.value}g.</td>
                    <td>{item.price}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Vault.propTypes = {
  getVault: PropTypes.func.isRequired,
  getReturnsByUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  vault: state.vault,
  sell: state.sell,
});

export default connect(mapStateToProps, {
  getVault,
  getReturnsByUser,
})(Vault);
