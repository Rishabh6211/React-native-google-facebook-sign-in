/*
 * @file: Home.js
 * @description: Contains the Home Page Container.
 * @date: 9.Oct.2018
 * @author: Ravi Kumar
 * */

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { goToAuth } from "../../config/navigation";
import { connect } from "react-redux";
import * as AppAction from "../../actions";
import { removeListeners } from "../../utilities/listeners";
import { handleBackPress } from "../../utilities/BackButtonHandling";
import { Navigation } from "react-native-navigation";


import Loader from "./../../components/common/loader";


import { TouchableOpacity } from "../../../node_modules/react-native-ui-lib";


import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';

let removeListener = true;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.isSideDrawerVisible = false;
    Navigation.events().bindComponent(this);
    Navigation.mergeOptions("bottomTabsid", {
      bottomTabs: {
        currentTabIndex: 2
      }
    });
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.listData !== (state && state.listData)) {
      return {
        listData: props.listData
      };
    }
    // No state update necessary
    return null;
  }

  navigationButtonPressed({ buttonId }) {
    !this.isSideDrawerVisible
      ? (this.isSideDrawerVisible = true)
      : (this.isSideDrawerVisible = false);
    if (buttonId === "buttonOne") {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: this.isSideDrawerVisible
          }
        }
      });
    }
  }

  componentDidMount() {
   
  }
  componentWillUnmount() {
    if (removeListener) {
      removeListeners();
    }
  }

  logout = () => {
    removeListener = false;
    this.props.logOut();
    goToAuth();
  };


  render() {
    if (this.props.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Loader />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <UsersList
            listData={this.props.listData}
            navigateToNextScreen={this.navigateToNextScreen}
          />
        </View>
        <TouchableOpacity style={{height:verticalScale(50),width:scale(300), alignItems: 'center', justifyContent:'center', borderRadius: moderateScale(30),backgroundColor:'#5cc174'}}>
          <Text style={{fontsize:RF(2.5)}} > Click to add new Card </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
  
   
    loading: state.userList.loading
  };
}

const mapDispatchToProps = dispatch => ({
    
    logOut: () => {
      dispatch(AppAction.logOut());
    },
    dispatch: () => {}
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({});
