import { CurrenciesReducer, getCurrencies } from './reducers';
import { GetCurrenciesActions } from './actions';
import { AppState } from '../../types/AppState';

describe('crypto store check', () => {
  it('should return object from store', () => {
    const state = ({
      crypto: { USD: '$' }
    } as unknown) as AppState;
    expect(getCurrencies(state)).toEqual({ USD: '$' });
  });

  it('should set crypto', () => {
    const action = {
      type: GetCurrenciesActions.CURRENCIES_FETCH_SUCCESS,
      crypto: [1, 2, 3]
    };
    Object.freeze(action.crypto);
    const target = CurrenciesReducer([], action);
    expect(target).toEqual([1, 2, 3]);
  });

  it('should set crypto to loading', () => {
    const action = {
      type: GetCurrenciesActions.CURRENCIES_FETCH_LOADING
    };
    Object.freeze(action.type);
    const target = CurrenciesReducer([], action);
    expect(target).toEqual('loading');
  });

  it('should set crypto to error', () => {
    const action = {
      type: GetCurrenciesActions.CURRENCIES_FETCH_FAILURE
    };
    Object.freeze(action.type);
    const target = CurrenciesReducer([], action);
    expect(target).toEqual('error');
  });
});
