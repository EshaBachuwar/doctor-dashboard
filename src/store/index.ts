import {
    createStore,
    combineReducers,
    applyMiddleware,
    Store,
    Middleware
} from 'redux';
import { thunk as thunkMiddleware, ThunkMiddleware } from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { AuthState } from '../types/auth';
import { AuthActionTypes } from '../actions/authActions';

export interface RootState {
    auth: AuthState;
}

const rootReducer = combineReducers({
    auth: authReducer
});

const middlewares: Middleware<{}, RootState>[] = [thunkMiddleware as unknown as ThunkMiddleware<RootState, AuthActionTypes>];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

export function setupStore(preloadedState?: Partial<RootState>) {
    return createStore(
        rootReducer,
        preloadedState as any,
        enhancer
    );
}

export const store = setupStore();

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();