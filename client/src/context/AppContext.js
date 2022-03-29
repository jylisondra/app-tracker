import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';
import {
  DISPLAY_ALERT_DANGER,
  DISPLAY_ALERT_CONFIRM,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from './actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token ? token : null,
  jobLocation: '',
  showSidebar: false,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlertDanger = () => {
    dispatch({ type: DISPLAY_ALERT_DANGER });
    clearAlert();
  };

  const displayAlertConfirm = () => {
    dispatch({ type: DISPLAY_ALERT_CONFIRM });
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const setupUser = async (currentUser, endpoint) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const res = await axios.post(`/api/v1/auth/${endpoint}`, currentUser);
      const { user, token } = res.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlertDanger,
        displayAlertConfirm,
        setupUser,
        toggleSidebar,
        logoutUser,
      }}
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
