import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "./types";

//open Sidebar
export const openSidebar = () => async (dispatch) => {
  dispatch({
    type: OPEN_SIDEBAR,
    payload: true,
  });
};

//close Sidebar
export const closeSidebar = () => async (dispatch) => {
  dispatch({
    type: CLOSE_SIDEBAR,
    payload: false,
  });
};
