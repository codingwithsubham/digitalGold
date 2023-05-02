import axios from "axios";
import { setAlert } from "./alert";
const { API_CONFIG } = require("../common/constants");

// get user team
export const getLatestReport = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/report/gold", API_CONFIG);
    return res.data;
  } catch (err) {
    dispatch(setAlert("Couldn't Fetch Rates at This Moment", "danger"));
  }
};