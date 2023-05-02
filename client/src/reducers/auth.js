import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  USERS_LOADED,
  RESET_ERROR,
  SETTINGS_LOADED,
  SETTINGS_LOADING_ERROR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  appSettings: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
      };

    case USERS_LOADED:
      return {
        ...state,
        users: payload,
        loading: false,
        isAuthenticated: true,
      };

    case SETTINGS_LOADED:
      return {
        ...state,
        loading: false,
        appSettings: payload,
      };

    case SETTINGS_LOADING_ERROR:
      return {
        ...state,
        loading: false,
        appSettings: null,
      };

    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
