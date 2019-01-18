import { AppState } from "react-native";

const _handleAppStateChange = nextAppState => {
  console.log("appstate,", nextAppState);
};

const handleFirstConnectivityChange = connectionInfo => {
  console.log(
    "First change, type: " +
      connectionInfo.type +
      ", effectiveType: " +
      connectionInfo.effectiveType
  );
};
export const addListeners = () => {
  AppState.addEventListener("change", _handleAppStateChange);
};
export const removeListeners = () => {
  AppState.removeEventListener("change", _handleAppStateChange);
};
