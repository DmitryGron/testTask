import { Reducer } from 'redux';
import { AppState } from '../../types/AppState';
import { GetCurrenciesActions, CurrenciesActionTypes } from './actions';

export const PageReducer: Reducer<any> = (state = [], action: CurrenciesActionTypes) => {
  switch (action.type) {
    case GetCurrenciesActions.PAGE_FETCH_SUCCESS:
      return action.page;
    case GetCurrenciesActions.PAGE_FETCH_FAILURE:
      return 'error';
    default:
      return state;
  }
};

export const getPage = (state: AppState) => state.page;
