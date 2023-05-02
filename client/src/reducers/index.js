import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import layout from "./layout";
import media from "./media";

export default combineReducers({
  alert,
  auth,
  layout,
  media,
});
