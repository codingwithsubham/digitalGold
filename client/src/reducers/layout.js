import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions/types";

const initialState = {
  isSidebarOpen: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: payload,
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: payload,
      };
    default:
      return state;
  }
}
