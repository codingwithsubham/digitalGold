import axios from "axios";
import { setAlert } from "./alert";
const { API_CONFIG } = require("../common/constants");

//requestPaymentGateway
export const requestPaymentGateway = (body) => async (dispatch) => {
  try {
    const res = await axios.post("/api/pg/create-order", body, API_CONFIG);
    return res.data;
  } catch (err) {
    dispatch(setAlert("Could not initiate Payment", "fail"));
  }
};
