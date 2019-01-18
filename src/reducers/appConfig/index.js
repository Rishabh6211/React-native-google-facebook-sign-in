// @flow
const INITIAL_STATE = {
  serverUrl: "https://reqres.in/"
};

function appConfig(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "APP_CONFIG_SUCCESS":
      return action.payload;
    default:
      return state;
  }
}

export default appConfig;
