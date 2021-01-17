import axios from 'axios';
import { Dispatch } from 'redux';
import { CRYPTO } from 'src/services/httpUrls';
import { ReduxActionType } from '../../types/GlobalTypes';
import { HttpResponse } from '../../types/HttpResponse';

export enum GetCurrenciesActions {
  CURRENCIES_FETCH_SUCCESS = 'CURRENCIES_FETCH_SUCCESS',
  CURRENCIES_FETCH_FAILURE = 'CURRENCIES_FETCH_FAILURE'
}

export const fetchCurrenciesSuccess = (crypto: any) => ({
  type: GetCurrenciesActions.CURRENCIES_FETCH_SUCCESS as const,
  crypto
});

export const fetchCurrenciesFailure = () => ({
  type: GetCurrenciesActions.CURRENCIES_FETCH_FAILURE as const
});

export const thunkFetchCurrencies = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(CRYPTO, {});
    dispatch(fetchCurrenciesSuccess(response.data));
  } catch (error) {
    dispatch(fetchCurrenciesFailure());
    throw error;
  }
};

export type CurrenciesActionTypes =
  | ReduxActionType<typeof fetchCurrenciesSuccess>
  | ReduxActionType<typeof fetchCurrenciesFailure>;
