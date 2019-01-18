
import Immutable from "seamless-immutable";

const initialState = Immutable({
  loading: false,
  root: "login"
});

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false
      };
     
    default:
      return state;
  }
}
