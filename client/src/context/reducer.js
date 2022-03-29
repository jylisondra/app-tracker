import {
  DISPLAY_ALERT_CONFIRM,
  DISPLAY_ALERT_DANGER,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from './actions';

import { initialState } from './AppContext';

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT_DANGER:
      return {
        ...state,
        showAlert: true,
        alertText: 'Please enter all fields',
        alertType: 'danger',
      };
    case DISPLAY_ALERT_CONFIRM:
      return {
        ...state,
        showAlert: true,
        alertText: 'Confirmed',
        alertType: 'confirm',
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertText: '',
        alertType: '',
      };
    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        jobLocation: action.payload.jobLocation,
        showAlert: true,
        alertType: 'success',
        alertText: 'Success! Redirecting...',
      };
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
