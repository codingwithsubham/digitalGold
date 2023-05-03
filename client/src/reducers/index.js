import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import layout from "./layout";
import media from "./media";
import vault from "./vault";

export default combineReducers({
  alert,
  auth,
  layout,
  vault,
  media,
});
