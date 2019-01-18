
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/config/routes';
import {addListeners} from './src/config/listeners';
import { Provider } from "react-redux";
import setup from "./src/store/setup";


Navigation.events().registerAppLaunchedListener(() => {
  const store = setup();
  registerScreens(store, Provider);
  addListeners();
  Navigation.setRoot({
    root: {
      component: {
        name: 'Loader'
      }
    },
  });
});