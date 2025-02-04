import {
    createStore,
    combineReducers,
    applyMiddleware,
    Store,
    Middleware
} from 'redux';
import { thunk as thunkMiddleware, ThunkMiddleware,ThunkDispatch } from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { AuthState } from '../types/auth';
import { AuthActionTypes } from '../actions/authActions';
import { patientReducer } from '../reducers/patientReducer';
import { PatientState } from '@/types/patient';
import { PatientActionTypes } from '@/actions/patientActions';

export interface RootState {
    auth: AuthState;
    patients: PatientState;
}

const rootReducer = combineReducers({
    auth: authReducer,
    patients: patientReducer
});
type AppActions = AuthActionTypes | PatientActionTypes;
export type AppDispatch = ThunkDispatch<RootState, void, AppActions>;
const middlewares: Middleware<{}, RootState>[] = [
    thunkMiddleware as ThunkMiddleware<RootState, AppActions>
];
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
export const useAppDispatch = () => useDispatch<AppDispatch>();