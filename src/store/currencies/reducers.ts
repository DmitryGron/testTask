import { combineReducers, Reducer } from 'redux';
import { AppState } from '../../types/AppState';
import { GetCurrenciesActions, CurrenciesActionTypes } from './actions';

export const CurrenciesReducer: Reducer<any> = (state = [], action: CurrenciesActionTypes) => {
  switch (action.type) {
    case GetCurrenciesActions.CURRENCIES_FETCH_SUCCESS:
      return action.crypto;
    case GetCurrenciesActions.CURRENCIES_FETCH_LOADING:
      return 'loading';
    case GetCurrenciesActions.CURRENCIES_FETCH_FAILURE:
      return 'error';
    default:
      return state;
  }
};

export const getCurrencies = (state: AppState) => state.crypto;
