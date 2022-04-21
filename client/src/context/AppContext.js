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
  SET_EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_BEGIN,
  TOGGLE_FAVORITE,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_VALUES,
  CLEAR_FILTERS,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  CREATE_INTERVIEW_BEGIN,
  CREATE_INTERVIEW_SUCCESS,
  CREATE_INTERVIEW_ERROR,
  GET_INTERVIEWS_BEGIN,
  GET_INTERVIEWS_SUCCESS,
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
  interviewDate: '',
  interviewType: 'phone-screen',
  interviewTypeOptions: ['phone-screen', 'on-site', 'technical', 'behavioral'],
  notes: '',
  interviews: [],
  totalInterviews: 0,
  totalJobs: 0,
  page: 1,
  numPages: 1,
  stats: {},
  monthlyApps: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
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

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  /* Alert Contexts */
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
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
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
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        location,
        dateApplied,
        status,
        jobType,
        companyURL,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
    } catch (error) {
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
    console.log(`delete ${id}`);
  };

  const getJobs = async () => {
    const { search, searchStatus, sort } = state;
    let url = `/jobs?status=${searchStatus}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numPages },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const toggleFavorite = (currentJob) => {
    dispatch({ type: TOGGLE_FAVORITE });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  /* Interview contexts */
  const createInterview = async () => {
    dispatch({ type: CREATE_INTERVIEW_BEGIN });
    try {
      const { interviewDate, interviewType, notes } = state;
      await authFetch.post('/interviews', {
        interviewDate,
        interviewType,
        notes,
      });
      console.log('interview created');
      dispatch({ type: CREATE_INTERVIEW_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_INTERVIEW_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getInterviews = async () => {
    dispatch({ tyle: GET_INTERVIEWS_BEGIN });
    let url = `/interviews`;
    try {
      const { data } = await authFetch(url);
      const { interviews, totalInterviews, numPages } = data;
      dispatch({
        type: GET_INTERVIEWS_SUCCESS,
        payload: { interviews, totalInterviews, numPages },
      });
    } catch (error) {
      //logoutUser();
    }
  };

  /* Stats contexts */
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/jobs/stats');
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApps: data.monthlyApps,
        },
      });
    } catch (error) {
      logoutUser();
    }
  };
  /* Search/Sort contexts */
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
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
        setEditJob,
        editJob,
        deleteJob,
        createInterview,
        getInterviews,
        clearValues,
        getJobs,
        toggleFavorite,
        showStats,
        clearFilters,
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
