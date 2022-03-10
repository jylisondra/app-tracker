import { createContext, useContext, useReducer } from 'react';
import {
  DISPLAY_ALERT_DANGER,
  DISPLAY_ALERT_CONFIRM,
  CLEAR_ALERT,
} from './actions';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlertDanger = () => {
    dispatch({ type: 'DISPLAY_ALERT_DANGER' });
    clearAlert();
  };

  const displayAlertConfirm = () => {
    dispatch({ type: 'DISPLAY_ALERT_CONFIRM' });
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT' });
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{ ...state, displayAlertDanger, displayAlertConfirm }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
