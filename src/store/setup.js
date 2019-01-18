/**
 * Name :Ravi Kumar
 * Description: Contains all redux store configuration
 * date: 7 Seopt 2018
 */
import { AsyncStorage } from "react-native";
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import * as reducers from "./../reducers";
import { persistStore, autoRehydrate } from "redux-persist";
import { createLogger } from "redux-logger";
import promise from "./promise";
import array from "./array";
import whitelist from "./whitelist";
import { goToAuth, goHome } from "../config/navigation";
// import startApp from '../config/navigators'
export default function setup() {
  const isDev = global.isDebuggingInChrome || __DEV__; // eslint-disable-line

  const logger = createLogger();

  const middleware = [
    autoRehydrate(),
    applyMiddleware(...[thunk, promise, array, logger])
  ];

  if (isDev) {
    middleware.push(
      applyMiddleware(require("redux-immutable-state-invariant").default())
    );
  }
  const reducer = combineReducers(reducers);
  const store = createStore(reducer, {}, compose(...middleware));

  // Attach the store to the Chrome debug window
  if (global.isDebuggingInChrome) {
    // eslint-disable-line
    window.store = store;
  }
  persistStore(store, { whitelist, storage: AsyncStorage }, () => {
    console.log("newstore", store.getState().app.root, store.getState().user);
    if (store.getState().user.isLoggedIn) {
      goHome();
    } else {
      goToAuth();
    }
    // on app loading the persit store loads and we have route from here
    // startApp(store.getState().app.root);
  });
  return store;
}
