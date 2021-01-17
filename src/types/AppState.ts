import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '../store/rootReducer';

export type AppThunkDispatch = ThunkDispatch<any, any, AnyAction>;
export type AppState = ReturnType<typeof rootReducer>;
