import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVault } from "../../actions/vault";

const Vault = ({ getVault, vault: { myVault, loading } }) => {
  useEffect(() => {
    getVault();
  }, [getVault]);

  console.log(myVault);
  return (
    <Fragment>
      <div className="vault">
        <div className="vault-hdr blnc">{myVault?.vaultBalance}</div>
        <h1>Passbook</h1>
        <div className="psbok">
          <table>
            <thead>
              <tr>
                <th>UTI</th>
                <th>Date</th>
                <th>Value (gm)</th>
                <th>Type</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {myVault?.passbook?.map((item, idx) => (
                <tr>
                  <td>{item._id.substr(item._id.length - 5)}</td>
                  <td>{item.date}</td>
                  <td>{item.value}</td>
                  <td>{item.type}</td>
                  <td>{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

Vault.propTypes = {
  getVault: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  vault: state.vault,
});

export default connect(mapStateToProps, {
  getVault,
})(Vault);
