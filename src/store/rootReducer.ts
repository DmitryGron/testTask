import { combineReducers } from 'redux';
import { CurrenciesReducer } from './currencies/reducers';

export const rootReducer = combineReducers({
  crypto: CurrenciesReducer
});

export default rootReducer;
