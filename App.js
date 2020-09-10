/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {

  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { AppProvider } from './AppProvider';
import { Root, Content,  Header, Container } from 'native-base';
import SwitchNavigator from './src/navigations/SwitchNavigator';
import SplashScreen from './src/screens/splash_screen/splashScreen';



const App = (props) => {
  
  return (
    // <AppProvider>
    //   <Root>
    //     {/* <SwitchNavigator navigation={props.navigation} /> */}
    //     <SplashScreen />
    //     {/* <View style={{width: "100%", backgroundColor: "red"}}></View> */}
    //   </Root>
    // </AppProvider>
    <View style={{backgroundColor: "red", flex: 1}}></View>
  );
};


export default App;
