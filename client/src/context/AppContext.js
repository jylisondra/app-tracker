import { createContext, useContext, useReducer } from 'react';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

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
