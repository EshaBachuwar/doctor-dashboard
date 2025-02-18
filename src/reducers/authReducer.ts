import { AuthState } from "@/types/auth";
import {
  AuthActionTypes,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_ERROR,
  LOGOUT,
  SET_TODAY_VISIT_COUNT,
} from "../actions/authActions";

const initialState: AuthState = {
  doctor: null,
  token: null,
  loading: false,
  error: null,
  todayVisitCount: 0,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        doctor: action.payload.doctor,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_TODAY_VISIT_COUNT:
      return {
        ...state,
        todayVisitCount: action.payload,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
