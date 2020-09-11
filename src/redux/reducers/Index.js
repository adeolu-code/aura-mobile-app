import {combineReducers} from 'redux';

import TestReducers from './TestReducers';


const appReducer = combineReducers({
  test: TestReducers
});


export default appReducer
