import { SERVER_URL } from "../../constants/url";

import { Alert } from "react-native";

import { goHome } from "../../config/navigation";

export const signup = (body, componentId) => {
  console.log("data sign up===>", `${SERVER_URL}users/register`, body);
  try {
    return async (dispatch, getState) => {
      dispatch({ type: "SIGNUP_REQUEST" });
      const response = await Request({
        url: `${SERVER_URL}users/register`,
        body,
        contentType: "multipart",
        method: "POST"
      });
      goHome();
      if (response.code === 200) {
        dispatch({ type:"SIGNUP_SUCCESS", payload: response });
       
      } else {
        Alert.alert(
          "SignUp Error",
          "Sign up failed, Please check if you are using the same email id for signing up."
        );
        dispatch({ type: "SIGNUP_FAIL" });
      }
    }
  } catch (error) {
      Alert.alert(
        "SignUp Error",
        "Something went wrong. Please try again later."
      );
      dispatch({ type: "SIGNUP_FAIL" });
  }
};

export const forgotPassword = (body, componentId) => {

  console.log("data sign up===>", `${SERVER_URL}users/register`, body);
  
  try {
    return async (dispatch, getState) => {
      dispatch({ type: "FORGOTPASS_REQUEST" });
      const response = await Request({
        url: `${SERVER_URL}users/forgotPassword`,
        body,
        method: "POST"
      });
      if (response.code === 200) {
        dispatch({ type: "FORGOTPASS_SUCCESS", payload: response });
        // changeRoute(componentId, "Congratulation", "Congratulation");
      } else {
        Alert.alert(
          "Forgot password",
          "Sorry. We cannot find any account associated with this email."
        );
        dispatch({ type: "FORGOTPASS_FAIL" });
      }
    };
  } catch (error) {
    console.log("catch catchy ",error)
    Alert.alert(
      "SignUp Error",
      "Something went wrong. Please try again later."
    );
    dispatch({ type: "FORGOTPASS_FAIL" });
  }

};
