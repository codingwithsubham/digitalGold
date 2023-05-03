import { VAULT_LOADED } from "../actions/types";

const initialState = {
  myVault: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case VAULT_LOADED:
      return {
        ...state,
        loading: false,
        vault: payload,
      };

    default:
      return state;
  }
}
