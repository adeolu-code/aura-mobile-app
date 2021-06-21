import {combineReducers} from 'redux';

import TestReducers from './TestReducers';
import AuthReducers from './AuthReducers';


const appReducer = combineReducers({
  auth: AuthReducers,
  test: TestReducers,
  
});


export default appReducer
