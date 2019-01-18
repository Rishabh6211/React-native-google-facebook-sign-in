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
import { manageComponentStats } from "../../actions/";


let removeListener = true;

class TnC extends React.Component {
  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;
    Navigation.events().bindComponent(this);
    Navigation.mergeOptions("bottomTabsid", {
      bottomTabs: {
        currentTabIndex: 2
      }
    });
  }

  componentDidMount() {
      this.props.manageComponentStats(
        this.props.componentId,
        "TnC",
        this.props.componentStats
      )
  }
  componentWillUnmount() {
    if (removeListener) {
      removeListeners();
    }
  }




  render() {

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text> To Display TnC </Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    componentStats: state.componentStats.componentStats,
    listData: state.userList.listData,
    loading: state.userList.loading
  };
}

const mapDispatchToProps = dispatch => ({
    manageComponentStats:(componentId,name,componentState)=>dispatch(manageComponentStats(componentId,name,componentState))
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TnC);

const styles = StyleSheet.create({});
