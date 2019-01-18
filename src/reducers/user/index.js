/*
AuthorName : Ravi Kumar
FileName: reducer.js
Description: Contains the reducer regarding the user
Date : 11 Sept 2018  
*/



const initialState = {
  isLoggedIn: false,
  userData: null
};

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        userData: null
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        userData: null
      };
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      console.log(action, "store.getState().userstore.getState().user");
      return { ...state, isLoggedIn: false, userData: null };
    default:
      return state;
  }
});
