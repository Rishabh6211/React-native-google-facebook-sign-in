/*
 * @file: routes.js
 * @description: Contains all routes registered.
 * @date: 9.Oct.2018
 * @author: Ravi Kumar
 * */
import { Navigation } from "react-native-navigation";

export const registerScreens = (store, Provider) => {
  // Loader Stack
  Navigation.registerComponentWithRedux(
    "Loader",
    () => require("../container/AppContainer").default,
    Provider,
    store
  );
  // Auth stack
  Navigation.registerComponentWithRedux(
    "SignIn",
    () => require("../container/auth/SignIn").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "SignUp",
    () => require("../container/auth/SignUp").default,
    Provider,
    store
  );
  // Dashboard Stack
  Navigation.registerComponentWithRedux(
    "Home",
    () => require("../container/dashboard/Home").default,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "SideMenu",
    () => require("../components/SideMenu").default,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "ForgotPassword",
    () => require("../container/auth/ForgotPassword").default,
    Provider,
    store
  );

  // Navigation.registerComponentWithRedux(
  //   "ForgotPassword",
  //   () => require("../container/auth/ForgotPassword").default,
  //   Provider,
  //   store
  // );

  Navigation.registerComponentWithRedux(
    "TnC",
    () => require("../container/Common/TnC").default,
    Provider,
    store
  );



};


