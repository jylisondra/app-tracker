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
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  CLEAR_VALUES,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
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
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  location: '',
  dateApplied: '',
  statusOptions: ['pending', 'interviewing', 'rejected'],
  jobTypeOptions: ['full-time', 'part-time', 'contract', 'internship'],
  jobType: 'full-time',
  status: 'pending',
  companyURL: '',
  isFavorite: false,
  jobs: [],
  totalJobs: 0,
  page: 1,
  numPages: 1,
  showSidebar: true,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Authorization error
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

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

  /* User Contexts */
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

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  /* Job Contexts */
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const {
        company,
        position,
        location,
        dateApplied,
        status,
        jobType,
        companyURL,
      } = state;
      await authFetch.post('/jobs', {
        company,
        position,
        location,
        dateApplied,
        status,
        jobType,
        companyURL,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getJobs = async () => {
    let url = `/jobs`;
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      console.log(data);
      const { jobs, totalJobs, numPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numPages },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
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
        updateUser,
        handleChange,
        createJob,
        clearValues,
        getJobs,
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
