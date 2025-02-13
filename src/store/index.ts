import {
    createStore,
    combineReducers,
    applyMiddleware,
    Store,
    Middleware
} from 'redux';
import { thunk as thunkMiddleware, ThunkMiddleware, ThunkDispatch } from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { AuthState } from '../types/auth';
import { AuthActionTypes } from '../actions/authActions';
import { patientReducer } from '../reducers/patientReducer';
import { PatientState } from '@/types/patient';
import { PatientActionTypes } from '@/actions/patientActions';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export interface RootState {
    auth: AuthState;
    patients: PatientState;
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'patients'],
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
    auth: authReducer,
    patients: patientReducer
});
import { Reducer } from 'redux';

const persistedReducer = persistReducer<RootState, AppActions>(persistConfig, rootReducer as unknown as Reducer<RootState, AppActions>);
type AppActions = AuthActionTypes | PatientActionTypes;
export type AppDispatch = ThunkDispatch<RootState, void, AppActions>;
const middlewares: Middleware<{}, RootState>[] = [
    thunkMiddleware as ThunkMiddleware<RootState, AppActions>
];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

export function setupStore(preloadedState?: Partial<RootState>) {
    const store = createStore(
        persistedReducer,
        preloadedState as any,
        enhancer
    );
    const persistor = persistStore(store as any);
   return { store, persistor };
}

export const { store, persistor } = setupStore();

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();