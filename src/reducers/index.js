import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ usertoken: tokenReducer, });

export default rootReducer;