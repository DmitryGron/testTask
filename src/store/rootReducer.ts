import { combineReducers } from 'redux';
import { PageReducer } from './analysis/reducers';
import { CurrenciesReducer } from './currencies/reducers';

export const rootReducer = combineReducers({
  crypto: CurrenciesReducer,
  page: PageReducer
});

export default rootReducer;
