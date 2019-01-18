/*
 * @file: Loader.js
 * @description: Contains the Loader Container.
 * @date: 9.Oct.2018
 * @author: Ravi Kumar
 * */

import React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import SplashScreen from 'react-native-splash-screen'
import { goToAuth, goHome } from "../config/navigation";
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from "react-native-fcm";

export default class AppContainer extends React.Component {
  componentWillUnmount() {
    console.log("unmount");
    // fetch(`https://www.googleapis.com/customsearch/v1?key=${'AIzaSyAEXulnCBfxJ-jD6QxT1ox_gG_mSriw-Pc'}&cx=${'012314601579892251898:yz15lso3juw'}&q=${encodeURIComponent('smart data')}&searchType=image`).then(ress=>{console.log(ress);ress.json().then(res=>console.log("mmsdcfsdcfsdcsdcsdcsdcsdc   ",res))})
    // goHome()
  }

  componentDidMount() {
    SplashScreen.hide();
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
     
    });
    this.notificationListener = FCM.on(FCMEvent.Notification, async notif => {
       console.log(notif, "gfhdgshfgdjfbdnsfhjdgjkdfbgjkdsjfhngjkdfugjkf")
      // if (notif.opened_from_tray) {
      //   if (Platform.OS === "android") {
      //     console.log(notif,"welcome");
      //     return;
      //   }
      // }
    });
    
      
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
