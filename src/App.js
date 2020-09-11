
import React, {Component, Fragment} from 'react';
import {Text, View, Platform} from 'react-native';
import 'react-native-gesture-handler';
import AppNavigation from './navigations/AppNavigation';
import {Provider} from 'react-redux';
import reducers from './redux/reducers/Index';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';



export class App extends Component {
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Fragment>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
        
      </Fragment>
    );
  }
}

export default App;
