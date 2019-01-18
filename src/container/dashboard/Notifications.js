import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { Navigation } from "react-native-navigation";
// import AppleMusic from "./../../components/other/AppleMusic";

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;
    Navigation.events().bindComponent(this);
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
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <AppleMusic /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
