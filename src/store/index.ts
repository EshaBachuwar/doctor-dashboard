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

// Define the root state type
export interface RootState {
    auth: AuthState;
}

// Create the root reducer
const rootReducer = combineReducers({
    auth: authReducer
});

// Configure middlewares
const middlewares: Middleware<{}, RootState>[] = [thunkMiddleware as unknown as ThunkMiddleware<RootState, AuthActionTypes>];

// Configure enhancers
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

// Create store setup function
export function setupStore(preloadedState?: Partial<RootState>) {
    return createStore(
        rootReducer,
        preloadedState as any,
        enhancer
    );
}

// Create the store
export const store = setupStore();

// Export typed hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();