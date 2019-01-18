
import Immutable from "seamless-immutable";

const initialState = Immutable({
  loading: false,
  data: null,
  root: "login"
});

export default function signup(state = initialState, action = {}) {
  switch (action.type) {
    case "SIGNUP_REQUEST":
      return {
        ...state,
        loading: true,
        data: null
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case "SIGNUP_FAIL":
      return {
        ...state,
        loading: false,
        data: null
      };
    case "FORGOTPASS_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "FORGOTPASS_SUCCESS":
      return {
        ...state,
        loading: false
      };
    case "FORGOTPASS_FAIL":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
