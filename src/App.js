
import React, {Component, Fragment} from 'react';
import {Text, View, Platform} from 'react-native';
import 'react-native-gesture-handler';
import AppNavigation from './navigations/AppNavigation';
import {Provider} from 'react-redux';
import reducers from './redux/reducers/Index';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import { AppProvider } from '../AppProvider';
import { Root } from 'native-base';



export class App extends Component {
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <AppProvider>
        <Fragment>
          <Provider store={store}>
            <Root>
              <AppNavigation />
            </Root>
          </Provider>
        </Fragment>
      </AppProvider>
      
    );
  }
}

export default App;
