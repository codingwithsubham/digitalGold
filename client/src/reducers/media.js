import { GET_MEDIA, UPLOAD_MEDIA } from "../actions/types";

const initialState = {
  media: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MEDIA:
      return {
        ...state,
        media: payload,
        loading: false,
      };
    case UPLOAD_MEDIA:
      return {
        ...state,
        media: [...state.media, payload.image],
        loading: false,
      };
    default:
      return state;
  }
}
