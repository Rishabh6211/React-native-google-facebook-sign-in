/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Ravi Kumar
 * */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import { removeListeners } from "../../utilities/listeners";
import { Navigation } from "react-native-navigation";
import * as AppAction from "../../actions";
import {invalidEmail,invalidPassword, linkedinClient, linkedinRedirect, linkedinSecret, emailReg, passwordReg} from '../../constants'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import {handleDeepLink} from "../../config/navigation";



const { height, width } = Dimensions.get("window");
let removeListener = true;



class SignIn extends React.Component {
  static options(passProps) {
    return {};
  }

  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      valid: false
    };
    this.signUp = this.signUp.bind(this);
    //this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent);
  }

  componentWillUnmount() {
    if (removeListener) {
      removeListeners();
    }
  }
  onNavigationEvent = ()=>{ handleDeepLink(event);}

  onChangeText = async (key, value) => {
    await this.setState({ [key]: value });
    let { email, password } = this.state; 
    if (email && password && emailReg.test(email) && passwordReg.test(password))
      this.setState({ valid: true, emailError: "", passwordError: "" });
    else {
      if (key === "email" && !emailReg.test(email))
        this.setState({ emailError: invalidEmail });
      else this.setState({ emailError: "" });
      if (key === "password" && !passwordReg.test(password))
        this.setState({ passwordError: invalidPassword });
      else this.setState({ passwordError: "" });
      this.setState({ valid: false });
    }
  };

 

  signIn = () => {
    const { email, password } = this.state;
    if (!email || !password) return this.setState({ valid: false });
    removeListener = false;
    this.props.login({ email, password });
  };
  signUp() {
    this.props.pushTParticulatScreen(this.props.componentId, "SignUp");
  }

  goForgot(){
    this.props.pushTParticulatScreen(this.props.componentId, "ForgotPassword");
  }

  render() {
    return (
      // <View style={{backgroundColor:'#5cc174'}}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={{ flex: 0.3 }} />
          <View style={{ flex: 0.05,marginHorizontal: moderateScale(20) }}>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 8,
                fontSize: RF(2),
                fontWeight: "bold",
                color: "white"
              }}
            >
              Email :
            </Text>
          </View>

          <View
            style={{
              width:scale(300),
              height:verticalScale(40),
              marginHorizontal: moderateScale(20),
              borderRadius: moderateScale(30),
              backgroundColor: "white",
            }}
          >
            <TextInput
              style={{
                margin: moderateScale(10),
                borderBottomColor: "#dadada",
                fontSize: RF(2.5),
                width:scale(250),
              }}
              value={this.state.email}
              onChangeText={email => this.onChangeText("email", email)}
              placeholder="email"
            />
            {this.state.emailError?<Text style={styles.errorTexts} >{this.state.emailError}</Text>:null}
          </View>
          
          <View style={{ flex: 0.05 }} />
          <View style={{ flex: 0.05,marginHorizontal: moderateScale(20) }}>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 8,
                fontSize: RF(2),
                fontWeight: "bold",
                color: "white"
              }}
            >
              Password :
            </Text>
          </View>
          <View
            style={{
              width:scale(300),
              height:verticalScale(40),
              backgroundColor: "white",
              marginHorizontal: moderateScale(20),
              borderRadius: moderateScale(30),
            }}
          >
            <TextInput
              secureTextEntry
              style={{
                width:scale(250),
                margin: moderateScale(10),
                borderBottomColor: "#dadada",
                fontSize: RF(2.5)
              }}
              value={this.state.password}
              onChangeText={password => this.onChangeText("password", password)}
              placeholder="password"
            />
            {this.state.passwordError?<Text style={styles.errorTexts} >{this.state.passwordError}</Text>:null}
          </View>
          

          <View style={{ flex: 0.05 }} />
          <Text
              onPress={()=>this.goForgot()}
                  style={{
                    fontSize: RF(2),
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  {"Forgotten Password?"}
                </Text>
          <View style={{ flex: 0.1 }} />
          <View style={{ flex: 0.5, }}>
            <View style={{ flex: 0.1 }} />


            <View
              style={{
                flex: 0.3,
                backgroundColor: "#FFF",
                width:scale(150),
                justifyContent: "center",
                alignSelf: "center",
                borderRadius:  moderateScale(30)
              }}
            >
              <TouchableOpacity
                style={{ margin: 10, alignItems: "center" }}
                onPress={this.signIn}
              >
                <Text
                  style={{
                    fontSize: RF(2),
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#5cc174"
                  }}
                >
                  {this.props.login.loading ? <ActivityIndicator /> : "Login"}
                </Text>
              </TouchableOpacity>

              
            </View>

            <View style={{ flex: 0.1 }} />

            <View
                style={{
                  flex: 0.3,
                  backgroundColor: "#FFF",
                  width:scale(150),
                  justifyContent: "center",
                  alignSelf: "center",
                  borderRadius:  moderateScale(30)
                }}
              >
                <TouchableOpacity
                  style={{ margin: 10, alignItems: "center" }}
                  onPress={()=>Platform.OS==="ios"?this.props.loginWithGoogleIos():this.props.loginWithGoogle()}
                >
                    <Text
                      style={{
                        fontSize: RF(2),
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#5cc174"
                      }}
                    >
                    {"Google"}
                  </Text>
                </TouchableOpacity>

                        
            </View>

           
            <View style={{ flex: 0.1 }} />

              <TouchableOpacity style={{flex: 0.3, backgroundColor: "#FFF", width: scale(150), justifyContent: "center", alignItems: "center",alignSelf: "center", borderRadius:moderateScale(30) }} onPress={() => this.props.loginWithFb()}>
                <Text style={{ fontSize: RF(2), textAlign: "center", fontWeight: "bold", color: "#669df7" }} >
                  Login with FB
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 0.1 }} />

            <View
              style={{
                flex: 0.3,
                backgroundColor: "#FFF",
                width:scale(150),
                justifyContent: "center",
                alignSelf: "center",
                borderRadius:  moderateScale(30)
              }}
            >
              <TouchableOpacity
                style={{ margin: 10, alignItems: "center" }}
                onPress={() => this.signUp()}
              >
                <Text
                  style={{
                    fontSize: RF(2),
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#5cc174"
                  }}
                >
                  SignUp with Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 0.2 }} />
        </KeyboardAwareScrollView>
      // </View>
    );
  }
}

const mapStateToProps = ({ app, user, login }) => ({
  app,
  user,
  login
});
const mapDispatchToProps = dispatch => ({
    login: data => dispatch(AppAction.login(data)),
    pushTParticulatScreen: (componentId, name) =>
      dispatch(AppAction.pushTParticulatScreen(componentId, name)),
    getLinkedUser: token => dispatch(AppAction.getLinkedUser(token)),
    loginWithFb: () => dispatch(AppAction.loginWithFb()),
    loginWithGoogle: () => dispatch(AppAction.googleLoginAction()),
    loginWithGoogleIos: () => dispatch(AppAction.googleLoginActionIos())
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

const styles = ScaledSheet.create({
  input: {
    width: scale(300),
    fontSize: RF(2.5),
    fontWeight: "500",
    height: '65@ms',
    backgroundColor: "#FFF",
    margin: 10,
    color: "white",
    padding: 8,
    borderRadius: moderateScale(30)
  },
  errorTexts: {
    margin: moderateScale(1),
    padding: moderateScale(10),
    fontSize: RF(1.5),
    color:'#ec4011'
  },
  container: {
    flex: 1,
    backgroundColor: "#5cc174"
  }
});
