import {
  SERVER_URL,
  linkedinBaseApi,
  facebookUserApiUrl
} from "../../constants";

import { Alert,Platform,NativeModules, NativeEventEmitter } from "react-native";
import { goHome } from "../../config/navigation";

import { Components } from "../../../node_modules/react-native-ui-lib";
import { LoginManager,AccessToken } from "react-native-fbsdk";
let GoogleLoginController = NativeModules.GoogleLoginController;
const GoogleLogin= new NativeEventEmitter(GoogleLoginController);
// const { LoginManager, AccessToken } = FBSDK;



const fetchFbProfile = async accessToken => {
  try {
    const response = await fetch(`${facebookUserApiUrl}${accessToken}`);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const login = body => {
  try {
    return async (dispatch, getState) => {
      dispatch({ type: "LOGIN_REQUEST" });
      const response = await Request({
        url: `${SERVER_URL}users/authenticate`,
        body,
        method: "POST"
      });
      goHome(); // will be removed from here
      if (response.code === 200)
        dispatch({ type: "LOGIN_SUCCESS", payload: response });
      else {
        Alert.alert("Error", "Something went wrong. Please try again later.");
        dispatch({ type: "LOGIN_FAIL" });
      }
    };
  } catch (error) {
    Alert.alert("Error", "Something went wrong. Please try again later.");
    dispatch({ type: "LOGIN_FAIL" });
  }
};


export const loginWithFb = () => async dispatch => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const result = await LoginManager.logInWithReadPermissions([
        "email",
        "public_profile"
      ]);
      const { accessToken } = await AccessToken.getCurrentAccessToken();
      if (accessToken) {
        const {
          first_name,
          last_name,
          name,
          id,
          email,
          picture
        } = await fetchFbProfile(accessToken);
     
        console.log("asfasfsf54758787878",accessToken)
        const body = {
          firstname: first_name,
          lastname: last_name,
          name,
          id,
          picture,
          email,
          platform: "facebook",
          // facebook_token: accessToken
        };
        console.log("2545454545afsaf",body)
        const loginResponse = await Request({
          url: `${SERVER_URL}users/authenticate`,
          body,
          method: "POST"
        });
        
        if (loginResponse.code === 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res });
        } else dispatch({ type: "LOGIN_FAIL" });
        return response;
      } else throw "Please try again later";
    } catch (error) {
      console.log("catch catchy ", error);
    }
  };

  export const googleLoginAction= () => {
    console.log("google")
    return async dispatch => {
     
      dispatch({ type: "LOGIN_REQUEST" });
      try {
        let GoogleSignIn = require("react-native-google-sign-in");
          await GoogleSignIn.configure({
            clientID:'192164745336-054394p8fv3pep8711s980rte5n62veq.apps.googleusercontent.com',
            scopes: ["openid", "email", "profile"],
            shouldFetchBasicProfile: true
          });
          //let GoogleSignIn = require("react-native-google-sign-in");
          const user = await GoogleSignIn.signInPromise();
          console.log("user =-=-=-=- ",user)
          if(user.email){
            let body = { googleId:user.userID,firstname:user.givenName,lastname:user.familyName,alias:user.email.split('@')[0],email:user.email, platform:'google',google_token:user.accessToken}
            console.log("body",body)
            //const encryptedBody = await Crypto.encrypt({encrypt:body});
          
   
        }
      } catch (error) {
        console.log('ctach error ==== > ', error)
      }
    };
  }

  let GoogleSignInEvent;
export const googleLoginActionIos= () => {
  
  return async dispatch => {
    // const {auth,token} = props;
    dispatch({ type: "LOGIN_REQUEST" });
    GoogleLoginController.login();
    // event
    GoogleSignInEvent = GoogleLogin.addListener(
      "GoogleSignInSuccess",
      async user => {
        console.log("user",user)
        // dispatch({type:"LOGIN_DEFAULT"})
        if(user){
          // dispatch({type:"LOGIN_DEFAULT"})
        if(user.idToken){
          // dispatch({type:"LOGIN_DEFAULT"})
            let body = { googleId:user.userID,firstname:user.givenName,lastname:user.familyName,alias:user.email?user.email.split('@')[0]:'',email:user.email, platform:'google',google_token:user.idToken}
            console.log("body78787878787",body)
            // const res = await PostApi({ url:`${ROOT_URL}/api/user/social`, body, method:"PUT", auth });
            // console.log("res********",res)
           
            // else {
            //   dispatch({ type: 'SIGNUP_DATA' , payload:{}, page: null});
            //   dispatch({ type: 'login_FAILED' , payload:{}});
            //   dispatch({type:"LOGIN_DEFAULT"})
            //   //toast({text:errorConsts.undefinedError, position:"bottom", buttonText:"Okay", type:"danger", duration:5000});
            // }
        }
      }else{
        console.log("here")
        // dispatch => {dispatch({type:"login_FAILED"})}
      }
      }
    );
    GoogleSignInEvent = GoogleLogin.addListener(
      "GoogleSignInFail",
      data => {
        console.log("here")
        // dispatch({ type: 'login_FAILED' , payload:{}});
        // dispatch({type: 'SIGNUP_DATA', payload: {}, page: null});
        // toast({text: auth.language=='es'? errorConsts.undefinedErrorEs:errorConsts.undefinedErrorEn, position:"bottom", buttonText:"Okay", type:"danger", duration:5000});
        }
    );
  }
}

export const logout = data => (dispatch, getState) => {
    dispatch({ type: "LOGOUT" });
  };


