/*
 * @file: SignUp.js
 * @description: Contains the SignUp Container.
 * @date: 9.Oct.2018
 * @author: Ravi Kumar
 * */

import React, { Fragment } from "react";
import { View, Button, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar, Colors} from 'react-native-ui-lib'
import {emailReg, passwordReg, invalidProfileImage, invalidEmail,invalidFirstName, invalidLastName, 
        invalidPassword,invalidPhoneNumber} from '../../constants'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import {signup}from "../../actions";
const imageOptions = {
  title: "Select Profile Pic",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

class SignUp extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    phone_number: "",
    profileImage: {
      uri: "",
      name: "",
      type: "image/jpg"
    },
    phoneNumberError: "",
    firstnameError: "",
    lastnameError: ""
  };
  onChangeText = async (key, value) => {
    await this.setState({ [key]: value });
    let { firstname, lastname, phone_number, email, password } = this.state;
    if (
      firstname &&
      lastname &&
      phone_number &&
      email &&
      password &&
      emailReg.test(email) &&
      passwordReg.test(password)
    )
      this.setState({
        valid: true,
        firstnameError: "",
        lastnameError: "",
        phoneNumberError: "",
        emailError: "",
        passwordError: ""
      });
    else {
      if (key == "firstname" && !firstname)
        this.setState({ firstnameError: invalidFirstName });
      else this.setState({ firstnameError: "" });
      if (key == "lastname" && !lastname)
        this.setState({ lastnameError: invalidLastName });
      else this.setState({ lastnameError: "" });
      if (key == "phone_number" && !phone_number)
        this.setState({ phoneNumberError: invalidPhoneNumber });
      else this.setState({ phoneNumberError: "" });
      if (key == "email" && !emailReg.test(email))
        this.setState({ emailError: invalidEmail });
      else this.setState({ emailError: "" });
      if (key == "password" && !passwordReg.test(password))
        this.setState({ passwordError: invalidPassword });
      else this.setState({ passwordError: "" });
      this.setState({ valid: false });
    }
  };
  signUp = async () => {
    const {
      firstname,
      lastname,
      phone_number,
      profileImage,
      email,
      password
    } = this.state;
    if (!profileImage.uri) return alert(invalidProfileImage);
    this.props.signUp(
      { firstname, lastname, phone_number, profileImage, email, password },
      this.props.componentId
    );
  };

  selectProfilePic() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
    // ImagePicker.showImagePicker(imageOptions, response => {
    
    //   this.setState({
    //     profileImage: {
    //       uri: response.uri,
    //       name: response.fileName,
    //       type: "image/jpg"
    //     }
    //   });
    // });
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#5cc174'}}>

      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={{backgroundColor:'#3e3446', flex:0.25, alignItems:'center', justifyContent:'center'}}>
          {this.state.profileImage.uri? <Avatar containerStyle={{marginVertical: 5}} imageSource={{uri:this.state.profileImage.uri}} backgroundColor={Colors.violet60} size={100}  onPress={() => this.selectProfilePic()}/>
          :<Avatar containerStyle={{marginVertical: 5}} backgroundColor={Colors.violet60} size={moderateScale(100)}  onPress={() => this.selectProfilePic()}/>}
        </View>
        <View style={{flex:0.1}}/>
        <View
          style={{
            backgroundColor: "#5cc174",
            flex: 0.55,
            alignItems: "center"
          }}
        >
          <View style={{ flex: 0.1 }} />
          <TextInput
            style={styles.input}
            placeholder=" Firstname"
            autoCapitalize="none"
            placeholderTextColor="#505a63"
            onChangeText={val => this.onChangeText("firstname", val)}
          />
          {this.state.firstnameError ? (
            <Text style={styles.errorTexts}>{this.state.firstnameError}</Text>
          ) : null}

            <TextInput
              style={styles.input}
              placeholder=" Password"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="#505a63"
              onChangeText={val => this.onChangeText("password", val)}
            />
            {this.state.passwordError?<Text style={styles.errorTexts} >{this.state.passwordError}</Text>:null}
            <TextInput
              style={styles.input}
              placeholder=" Email"
              autoCapitalize="none"
              placeholderTextColor="#505a63"
              onChangeText={val => this.onChangeText("email", val)}
            />
            {this.state.emailError?<Text style={styles.errorTexts} >{this.state.emailError}</Text>:null}
            <TextInput
              style={styles.input}
              placeholder=" Phone Number"
              autoCapitalize="none"
              placeholderTextColor="#505a63"
              onChangeText={val => this.onChangeText("phone_number", val)}
            />
            {this.state.phoneNumberError?<Text style={styles.errorTexts} >{this.state.phoneNumberError}</Text>:null}
            <View style={{flex:0.05}}/>
            <TouchableOpacity disabled={!this.state.valid && !this.state.profileImage.uri} style={{backgroundColor:'#FFF' , alignItems:'center', justifyContent:'center', height:verticalScale(50), width:scale(120), borderRadius:moderateScale(30)}} onPress={this.signUp} >
              <Text style={{fontSize:RF(2.5), color:'#5cc174'}}>
                Sign Up
              </Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:0.05}}/>
      </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    // width: 350,
    // height: 55,
    height: verticalScale(45),
    width: scale(250),
    backgroundColor: "#FFF",
    margin: moderateScale(10),
    padding: moderateScale(8),
    color: "#191c1f",
    fontSize:RF(2),
    borderRadius: moderateScale(30)
  },
  container: { flex:1
  },
  errorView: {
    backgroundColor: "white"
  },
  errorTexts: {
    margin: 10,
    padding: 8,
    color:'#cc0000',
    fontSize: RF(10),
  }
});
const mapStateToProps = ({ app, user, signup }) => ({
    app,
    user,
    signup
  });
const mapDispatchToProps = dispatch => ({
    signUp: (data, componentId) => dispatch(signup(data, componentId))
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
