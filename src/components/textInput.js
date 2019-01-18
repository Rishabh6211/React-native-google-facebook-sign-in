import React, { Component } from "react";
import RF from "react-native-responsive-fontsize";
import FloatingLabel from "../vendors/react-native-floating-labels";

import { colors } from "../constants/theme";
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
export default class TextInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const{style={width:scale(250), height:verticalScale(60),}, inputStyle={ fontsize:RF(2), height:verticalScale(50)},
      placeholder='',  value='',onBlur=()=>{},onChangeText=()=>{}} = this.props;
    return (
      <FloatingLabel
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        secureTextEntry={this.props.secureTextEntry}
        labelStyle={this.props.labelInput}
        inputStyle={inputStyle}
        style={style}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        onKeyPress={this.props.onKeyPress}
        keyboardType={this.props.keyboardType}
      >
        {this.props.label}
      </FloatingLabel>
    );
  }
}

