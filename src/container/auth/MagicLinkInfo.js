import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,Linking
} from "react-native";
import { removeListeners } from "../../utilities/listeners";
// import {magicLink} from "../../actions";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';


let removeListener = true;

class MagicLinkInfo extends React.Component {

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

    
      render() {
        return (
            <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View style={{ flex: 0.8, alignItems:'center', justifyContent:'center' }} >
                    <Text
                        style={{
                        marginLeft: 10,
                        marginTop: 8,
                        fontSize: RF(2.1),
                        fontWeight: "bold",
                        color: "white"
                        }}
                    >
                    Please check your email
                    </Text> 

                        <View style={{flex:0.05}}/>
                        <TouchableOpacity
                            style={styles.resendLink}
                            onPress={()=>Linking.openURL(`inbox-gmail:`)}
                            >
                            <Text
                            style={styles.resentText}
                            >
                        {"Open Mail"}
                        </Text>
                    </TouchableOpacity>

                    
                </View>  
            </KeyboardAwareScrollView>
            </View>
        );
      }
    }
    
    const mapStateToProps = ({ app, user, signup }) => ({
      app,
      user,
      signup
    });
    const mapDispatchToProps = dispatch => ({
      });
    
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(MagicLinkInfo);
    
    const styles = ScaledSheet.create({
      
      resendLink:{
        backgroundColor:'#FFF',
        alignItems: 'center',
        justifyContent:'center',
        height:verticalScale(40),
        width:scale(100),
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
    