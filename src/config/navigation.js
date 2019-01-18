/*
 * @file: Navigation.js
 * @description: Contains the navigation Stacks.
 * @date: 9.Oct.2018
 * @author: Ravi Kumar
 * */
import React from "react";
import { View, Text } from "react-native";
import { Navigation } from "react-native-navigation";

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "SignIn",
              passProps: {
                text: "React Native"
              },
              options: {
                statusBar: {
                  visible: true,
                  style: "light",
                  hideWithTopBar: true,
                  blur: true
                },
                topBar: {
                  hideOnScroll: true,
                  title: {
                    text: "Login",
                    color: "red"
                  },
                  subtitle: {
                    text: "Title",
                    fontSize: 14,
                    color: "red",
                    fontFamily: "Helvetica",
                    alignment: "center"
                  },
                  drawBehind: true,
                  visible: false,
                  animate: false
                }
              }
            }
          }
        ]
      }
    }
  });






  
  
