import {
  DISPLAY_ALERT_CONFIRM,
  DISPLAY_ALERT_DANGER,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  CLEAR_VALUES,
  SET_EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_BEGIN,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  TOGGLE_SIDEBAR,
  TOGGLE_FAVORITE,
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
    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Info Successfully Update',
        isLoading: false,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
        isLoading: false,
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
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CREATE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Job Successfully Added',
      };
    case CREATE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    case GET_JOBS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numPages: action.payload.numPages,
      };
    case DELETE_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SET_EDIT_JOB:
      const job = state.jobs.find((job) => job._id === action.payload.id);
      const {
        _id,
        company,
        position,
        location,
        dateApplied,
        jobType,
        status,
        companyURL,
      } = job;
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        company,
        position,
        location,
        dateApplied,
        jobType,
        status,
        companyURL,
      };
    case EDIT_JOB_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Job Successfully Updated',
      };
    case EDIT_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    case TOGGLE_FAVORITE:
      return {
        ...state,
        isFavorite: !state.isFavorite,
      };
    case CLEAR_VALUES:
      const initialState = {
        isEditing: false,
        editJobId: '',
        company: '',
        position: '',
        location: '',
        dateApplied: '',
        jobType: 'full-time',
        status: 'pending',
        companyURL: '',
      };
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default reducer;
