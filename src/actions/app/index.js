
import { Navigation } from "react-native-navigation";

export const pushTParticulatScreen = (componentId, screenNAme) => dispatch => {
 
    Navigation.push(componentId, {
      component: {
        name: screenNAme
      }
    });
  };

export const pop = componentId => dispatch => {
    Navigation.pop(componentId);
  };

/**
 * Navigate to a new page and clear the backstack.
 */
export function resetTo(newScreen: string): Function {
  return dispatch => {
    dispatch(navigate(newScreen, true));
  };
}

export const mergeOptions = (componentId, draweropen) => dispatch => {
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: draweropen
        }
      }
    });
  };
export const setScrenStack = (componentId, screen, visible) => dispatch => {
    Navigation.setStackRoot(componentId, {
      component: {
        name: screen,
        options: {
          topBar: {
            title: {
              text: "Home"
            }
          },
          bottomTabs: {
            visible,
            drawBehind: true
          }
        }
      }
    });
  };

/**
 * Internal helper method for setting the redux state
 */
export const navigate = (newScreen: string, reset: boolean) => ({
    type: t.SCREEN,
    screen: newScreen,
    isReset: reset
  });
