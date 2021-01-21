import axios from 'axios';
import { Dispatch } from 'redux';
import { ReduxActionType } from '../../types/GlobalTypes';

export enum GetCurrenciesActions {
  PAGE_FETCH_SUCCESS = 'PAGE_FETCH_SUCCESS',
  PAGE_FETCH_FAILURE = 'PAGE_FETCH_FAILURE'
}

export const fetchPageSuccess = (page: any) => ({
  type: GetCurrenciesActions.PAGE_FETCH_SUCCESS as const,
  page
});

export const fetchPageFailure = () => ({
  type: GetCurrenciesActions.PAGE_FETCH_FAILURE as const
});

export const thunkFetchPage = (url: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/${url}`, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
    if (response.data) {
      dispatch(fetchPageSuccess(response.data));
    }
  } catch (error) {
    dispatch(fetchPageFailure());
    throw error;
  }
};

export type CurrenciesActionTypes =
  | ReduxActionType<typeof fetchPageSuccess>
  | ReduxActionType<typeof fetchPageFailure>;
