import {
  DISPLAY_ALERT_CONFIRM,
  DISPLAY_ALERT_DANGER,
  CLEAR_ALERT,
} from './actions';

import { initialState } from './AppContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY_ALERT_DANGER':
      return {
        ...state,
        showAlert: true,
        alertText: 'Please enter all fields',
        alertType: 'danger',
      };
    case 'DISPLAY_ALERT_CONFIRM':
      return {
        ...state,
        showAlert: true,
        alertText: 'Confirmed',
        alertType: 'confirm',
      };
    case 'CLEAR_ALERT':
      return {
        ...state,
        showAlert: false,
        alertText: '',
        alertType: '',
      };
    default:
      return state;
  }
};

export default reducer;
