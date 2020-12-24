
import React, {Component, Fragment} from 'react';
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import {Text, View, Platform, LogBox} from 'react-native';
import AppNavigation from './navigations/AppNavigation';
import {Provider} from 'react-redux';
import reducers from './redux/reducers/Index';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import { AppProvider } from '../AppProvider';
import { ManagePropertyProvider } from '../ManagePropertyProvider';
import { Root } from 'native-base';

import { setNativeExceptionHandler } from "react-native-exception-handler";



import FlashMessage from "react-native-flash-message";

LogBox.ignoreAllLogs()

export class App extends Component {
  
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      
      <AppProvider>
        <ManagePropertyProvider>
          <Fragment>
            <Provider store={store}>
              <Root>
                <AppNavigation />
              </Root>
            </Provider>

            <FlashMessage position="bottom" />
          </Fragment>
        </ManagePropertyProvider>
      </AppProvider>
      
    );
  }
}

export default App;
