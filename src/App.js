
import React, {Component, Fragment} from 'react';
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import {Alert, BackAndroid, Platform, LogBox} from 'react-native';
import AppNavigation from './navigations/AppNavigation';
import {Provider} from 'react-redux';
import reducers from './redux/reducers/Index';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import { AppProvider } from '../AppProvider';
import { ManagePropertyProvider } from '../ManagePropertyProvider';
import { Root } from 'native-base';

// import { setNativeExceptionHandler } from "react-native-exception-handler";
import {setJSExceptionHandler, getJSExceptionHandler} from 'react-native-exception-handler';

import SplashScreen from 'react-native-splash-screen';

import codePush from "react-native-code-push";

import FlashMessage from "react-native-flash-message";
import { MenuProvider } from 'react-native-popup-menu';

// const errorHandler = (e, isFatal) => {
//   // console.log('Called')
//   if (isFatal) {
//     reporter(e);
//     Alert.alert(
//         'Unexpected error occurred',
//         `
//         Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
//         We have reported this to our team ! Please close the app and start again!
//         `,
//       [{
//         text: 'Close',
//         onPress: () => {
//           BackAndroid.exitApp();
//         }
//       }]
//     );
//   } else {
//     console.log('Error Handler from general error picker ',e); // So that we can see it in the ADB logs in case of Android if needed
//   }
// };

// setJSExceptionHandler(errorHandler, true);

LogBox.ignoreAllLogs()

export class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      
      <AppProvider>
        <ManagePropertyProvider>
          <Fragment>
            <Provider store={store}>
              <MenuProvider>
              <Root>
                <AppNavigation />
              </Root>
              </MenuProvider>
            </Provider>

            <FlashMessage position="bottom" />
          </Fragment>
        </ManagePropertyProvider>
      </AppProvider>
      
    );
  }
}

export default codePush(App);
