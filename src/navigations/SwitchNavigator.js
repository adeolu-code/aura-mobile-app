import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AppNavigation from "./AppNavigation";
import AuthNavigator from "./AuthNavigation";
import SplashScreen from "./../screens/splash_screen/splashScreen";

const SwitchNavigator = createSwitchNavigator({
  Home: {
    screen: AppNavigation,
  },
  Auth: {
      screen: AuthNavigator
  }, 
  Splash: {
    screen: SplashScreen
  }},
  {
      initialRouteName: 'Splash',
  });

  export default createAppContainer(SwitchNavigator);