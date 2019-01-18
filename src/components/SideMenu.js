/*
 * @file: SideMenu.js
 * @description: Contains the SideMenu Container.
 * @date: 9.Oct.2018
 * @author: Ravi Kumar
 * */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {logout, setScrenStack} from "../actions";

import Icon from "react-native-vector-icons/FontAwesome";
import { goToAuth, goToHistory, goHome, goToAlert } from "../config/navigation";
import {Avatar, Colors} from 'react-native-ui-lib'
import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import {pushTParticulatScreen} from '../actions/app/index'



var { height, width } = Dimensions.get("window");

class SideMenu extends React.Component {
  state = {
    profileImage:{
      uri:''
    }
  }
  constructor(props) {
   
    super(props);
    // this.hideSideMenu = this.hideSideMenu.bind(this);
    // this.setScrenStack = this.setScrenStack.bind(this);

    this.sideList = [
      {name:'Home', icon:'home', action:()=>goHome()},
      {name:'Create new card', icon:'home', action:()=> this.props.pushTParticulatScreen('CardsStack','NewCard')},
      {name:'My Cards', icon:'home', action:()=> this.props.pushTParticulatScreen('CardsStack','MyCards')},
      {name:'Saved cards', icon:'home', action:()=> this.props.pushTParticulatScreen('CardsStack','NewCard')},
      {name:'View analytics', icon:'home', action:()=> this.props.pushTParticulatScreen('CardsStack','NewCard')},
      {name:'Terms and conditons', icon:'home', action:()=> this.props.pushTParticulatScreen('CardsStack','NewCard')},
      {name:'Help Section ', icon:'home', action:()=> this.props.pushTParticulatScreen('CardsStack','NewCard')},
      {name:'App Setting', icon:'home', action:()=> this.props.pushTParticulatScreen('CardsStack','NewCard')},
      {name:'Sign out', icon:'home', action:()=>this.props.logout()},
    ]
  }
  hideSideMenu() {
    // this.props.appAction.mergeOptions(this.props.componentId, false);
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });
  }
componentWillMount(){
  console.log(">>><<<><><><><><><><>>>>> ", this.props);
}

  setScrenStack(screen, visible) {
    this.props.setScrenStack("MY_STACK", screen, visible);
    // this.hideSideMenu();
  }
  commonFunction(Screen){
    Navigation.push('CardsStack', {
      component: {
        name: '',
        options: {
          bottomTabs: {
            visible: false,
            drawBehind: true,
            animate: true
          }
        }
      }
    });
  }
  renderList(name='',action){
    return(
      <View style={styles.text}>
        <TouchableOpacity
          style={{ flex: 1,  flexDirection: "row" }}
          onPress={() => {
            action()
            // this.setScrenStack("Home", true);
            // action()
           
            // Navigation.push('CardsStack', {
            //   component: {
            //     name: "NewCard",
            //     options: {
            //       bottomTabs: {
            //         visible: false,
            //         drawBehind: true,
            //         animate: true
            //       }
            //     }
            //   }
            // });
            // this.props.pushTParticulatScreen('CardsStack','NewCard')
           this.hideSideMenu()
          }}
        >
          <View style={{ flex: 0.2 }}>
            <Icon
              name="home"
              size={moderateScale(20)}
              style={{ alignSelf: "center", marginLeft: width * 0.055 }}
            />
          </View>

          <View style={{ flex: 0.8, justifyContent: "center" }}>
            <Text style={styles.welcome}>{name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    console.log("SDGs5df77f7s86F7687678SDF",this.props)
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "#05B8CC", flex: 0.09 }} />
        <View style={styles.profilePicView}>

          {this.state.profileImage.uri? <Avatar containerStyle={{marginVertical: moderateScale(5)}} imageSource={{uri:this.state.profileImage.uri}} backgroundColor={Colors.violet60} size={100}  />
              :<Avatar containerStyle={{marginVertical: moderateScale(5)}} backgroundColor={Colors.violet60} size={moderateScale(60)}  />}
        </View>
        {this.sideList.map(_=>  this.renderList(_.name,_.action))}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: RF(2.5)
  },
  container: {
    flex: 1
  },
  text: {
    height: verticalScale(57),
    width: scale(200),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  profilePicView:{
    height: verticalScale(130),
    width: scale(100),
    justifyContent:'center',
    alignItems:'center'
  },
});
const mapStateToProps = ({ app, user }) => ({
  
  app,
  user
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  setScrenStack:(stack,screen, visible)=>dispatch(setScrenStack(stack,screen, visible)),
  pushTParticulatScreen:(componentId,screenName) => dispatch(pushTParticulatScreen(componentId,screenName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
