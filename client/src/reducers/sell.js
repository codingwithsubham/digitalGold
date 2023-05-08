import { GET_RETURNS } from "../actions/types";

const initialState = {
  returns: [],
  sells: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RETURNS:
      return {
        ...state,
        returns: payload,
      };

    default:
      return state;
  }
}
