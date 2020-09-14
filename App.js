/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, Fragment, Component } from 'react';
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
import SwitchNavigator, { SwitchStack } from './src/navigations/SwitchNavigator';
import SplashScreen from './src/screens/splash_screen/splashScreen';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/redux/reducers/Index';
import ReduxThunk from 'redux-thunk';
import AppNaigator from "./src/navigations/AppNavigation";



class App extends Component {
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <AppProvider>
        <Fragment>
          <Provider store={store}>
            <Root>
              {/* <SwitchNavigator navigation={this.props.navigation} /> */}
              {/* <AppNaigator /> */}
              <SwitchStack />
            </Root>
          </Provider>
        </Fragment>
      </AppProvider>
      
    );
  }
}


export default App;
