import axios from 'axios';
import { Dispatch } from 'redux';
import { ReduxActionType } from '../../types/GlobalTypes';

export enum GetCurrenciesActions {
  CURRENCIES_FETCH_LOADING = 'CURRENCIES_FETCH_LOADING',
  CURRENCIES_FETCH_SUCCESS = 'CURRENCIES_FETCH_SUCCESS',
  CURRENCIES_FETCH_FAILURE = 'CURRENCIES_FETCH_FAILURE'
}

export const fetchCurrenciesSuccess = (crypto: any) => ({
  type: GetCurrenciesActions.CURRENCIES_FETCH_SUCCESS as const,
  crypto
});

export const fetchCurrenciesLoading = () => ({
  type: GetCurrenciesActions.CURRENCIES_FETCH_LOADING as const
});

export const fetchCurrenciesFailure = () => ({
  type: GetCurrenciesActions.CURRENCIES_FETCH_FAILURE as const
});

export const thunkFetchCurrencies = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchCurrenciesLoading());
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json', {});
    if (response.data) {
      dispatch(fetchCurrenciesSuccess(response.data));
    }
  } catch (error) {
    dispatch(fetchCurrenciesFailure());
    throw error;
  }
};

export type CurrenciesActionTypes =
  | ReduxActionType<typeof fetchCurrenciesLoading>
  | ReduxActionType<typeof fetchCurrenciesSuccess>
  | ReduxActionType<typeof fetchCurrenciesFailure>;
