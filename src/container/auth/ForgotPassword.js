import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { removeListeners } from "../../utilities/listeners";
import {forgotPassword} from "../../actions";
import {invalidEmail, emailReg} from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';


let removeListener = true;

class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillUnmount() {
    if (removeListener) {
      removeListeners();
    }
  }
  onChangeText = async (key, value) => {
    await this.setState({ [key]: value });
    let { email } = this.state; 
    if (email && emailReg.test(email))
      this.setState({ valid: true, emailError: "" });
    else {
        this.setState({ valid: false });
    }
  };

  forgotPassword(){
    console.log(this.props,this.state)
    const {email,valid} = this.state;
    if(valid)
    this.props.forgotPassword({email},this.props.componentId)
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 0.3 }} />
        <View style={{ flex: 0.7, }} >

          <View style={{ flex: 0.08,marginHorizontal: moderateScale(18) }}>
            <Text
              style={{
                marginLeft: moderateScale(12),
                marginTop: moderateScale(8),
                fontSize: RF(2.1),
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
          </View>
          <View style={{ flex: 0.075 }} />
          <View style={styles.buttonView} >
            <TouchableOpacity
                activeOpacity={this.state.valid?0.6:1}
                style={styles.resendLink}
                onPress={()=>this.forgotPassword()}
              >
                <Text
                  style={{...styles.resentText,color: this.state.valid?"#5cc174":"#7bb98a"}}
                >
                  {"Send Link"}
                </Text>
              </TouchableOpacity>
          </View>  
        </View>  
        
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ app, user, signup }) => ({
  app,
  user,
  signup
});
const mapDispatchToProps = dispatch => ({
    forgotPassword:(email,componentId)=>dispatch(forgotPassword(email,componentId))
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

const styles = ScaledSheet.create({
  input: {
    width: scale(300),
    fontSize: RF(2.5),
    fontWeight: "500",
    height: '65@ms',
    backgroundColor: "#42A5F5",
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
  resendLink:{
    backgroundColor:'#FFF',
    alignItems: 'center',
    justifyContent:'center',
    height:verticalScale(40),
    width:scale(120),
    borderRadius:moderateScale(30)
  },
  container: {
    flex: 1,
    backgroundColor: "#5cc174"
  },
  resentText:{
    fontSize: RF(2),
    textAlign: "center",
    fontWeight: "bold",
    color: "#5cc174"
  },
  buttonView:{
    alignItems: 'center',
    justifyContent:'center'
  }
});
