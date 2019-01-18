// @flow

import React from "react";

import { ActivityIndicator } from "react-native";

export default class Loader extends React.Component {
  render() {
    return (
      <ActivityIndicator
        style={{
          flex: 1
        }}
        color="#0000ff"
      />
    );
  }
}
