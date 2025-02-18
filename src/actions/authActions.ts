import { Doctor } from "@/types/auth";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const CLEAR_ERROR = "CLEAR_ERROR";

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: {
    doctor: Doctor;
    token: string;
  };
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: string;
}

interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
}

export type AuthActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | ClearErrorAction
  | LogoutRequestAction
  | SetTodayVisitCountAction;

export const registerRequest = (): RegisterRequestAction => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (data: {
  doctor: Doctor;
  token: string;
}): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerFailure = (error: string): RegisterFailureAction => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const clearError = (): ClearErrorAction => ({
  type: CLEAR_ERROR,
});
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SET_TODAY_VISIT_COUNT = "SET_TODAY_VISIT_COUNT";

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    doctor: Doctor;
    token: string;
  };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}
interface SetTodayVisitCountAction {
  type: typeof SET_TODAY_VISIT_COUNT;
  payload: number;
}
export const loginRequest = (): LoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data: {
  doctor: Doctor;
  token: string;
}): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: error,
});
export const setTodayVisitCount = (count: number) => ({
  type: SET_TODAY_VISIT_COUNT,
  payload: count,
});
export const LOGOUT = "AUTH/LOGOUT";
interface LogoutRequestAction {
  type: typeof LOGOUT;
}
export const logout = (error: string): LogoutRequestAction => ({
  type: LOGOUT,
});
