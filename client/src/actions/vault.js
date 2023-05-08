import axios from "axios";
import { setAlert } from "./alert";
import { VAULT_LOADED } from "./types";
const { API_CONFIG } = require("../common/constants");

// get VAULT
export const getVault = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/vault", API_CONFIG);
    dispatch({
      type: VAULT_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Couldn't Fetch Vault at This Moment", "danger"));
  }
};

// get transfer
export const transfer = (body) => async (dispatch) => {
  try {
    const res = await axios.post("/api/vault/transfer", body, API_CONFIG);
    dispatch({
      type: VAULT_LOADED,
      payload: res.data,
    });
    dispatch(setAlert(`Successfully Transfered to ${body?.to}`, "success"));
  } catch (err) {
    dispatch(setAlert("Couldn't Transfer at This Moment", "danger"));
  }
};
