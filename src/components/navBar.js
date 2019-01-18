import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RF from "react-native-responsive-fontsize";
import FloatingLabel from "../vendors/react-native-floating-labels";
import { Navigation } from "react-native-navigation";

import { colors } from "../constants/theme";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;
    Navigation.events().bindComponent(this);
  }
  navigationButtonPressed = () => {
    alert();
    !this.isSideDrawerVisible
      ? (this.isSideDrawerVisible = true)
      : (this.isSideDrawerVisible = false);
    console.log(buttonId, "buttonIdbuttonIdbuttonId");
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: this.isSideDrawerVisible
        }
      }
    });
  };
  render() {
    return (
      <TouchableOpacity
        onPress={() => alert()}
        style={{
          flex: 1,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          onPress={() => this.navigationButtonPressed()}
          style={{
            flex: 1,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Left</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Opps by name</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Right</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default NavBar;
