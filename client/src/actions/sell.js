import axios from "axios";
import { setAlert } from "./alert";
import { GET_RETURNS, VAULT_LOADED } from "./types";
const { API_CONFIG } = require("../common/constants");

// Add Return
export const sellGold = (body) => async (dispatch) => {
  try {
    const res = await axios.post("/api/sale/return", body, API_CONFIG);
    dispatch({
        type: VAULT_LOADED,
        payload: res.data,
      });
      dispatch(setAlert("Sold Succesfully", "success"));
  } catch (err) {
    dispatch(setAlert("Couldn't Sell Gold at this moment!!", "danger"));
  }
};

// get Returns status
export const getReturnsByUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sale/returns/user", API_CONFIG);
    dispatch({
        type: GET_RETURNS,
        payload: res.data,
      });
      
  } catch (err) {
    dispatch(setAlert("Couldn't Get Returns at this moment!!", "danger"));
  }
};