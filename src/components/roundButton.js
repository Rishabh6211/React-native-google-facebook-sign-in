import React from "react";
import { View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import RF from "react-native-responsive-fontsize";
import { colors } from "../constants/theme";

const RoundButton = props => (
  <TouchableOpacity
    style={{
        height: RF(7),
        width: RF(7),
        borderRadius: RF(7) / 2,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
      }}
    onPress={props.onPress}
    disabled={props.loading}
  >
    <Image
      style={{ flex: 1 }}
      source={
          props.loading
            ? require("../assets/img/buttons/empty.png")
            : require("../assets/img/buttons/arrow.png")
        }
      resizeMode="contain"
    />
    {props.loading ? (
      <View style={{ flex: 1, position: "absolute" }}>
        <ActivityIndicator color={colors.primary} />
      </View>
      ) : null}
  </TouchableOpacity>
  );

export default RoundButton;
