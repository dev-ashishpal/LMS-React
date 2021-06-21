import * as actionTypes from './actions';
import {updateObject} from './utility';

const initialState = {
  data: [],
  loading: false,
  error: null,
  //VIDEO
  videoData: [],
  videoLoading: false,
  videoError: null,
  //NOTES
  notesData: [],
  notesLoading: false,
  notesError: null,
  //PAPER
  paperData: [],
  paperLoading: false,
  paperError: null,
  //NOTIFICATION
  notificationData: [],
  notificationLoading: false,
  notificationError: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.DASHBOARD_DATA_START :  return updateObject(state, {loading: true});
        case actionTypes.DASHBOARD_DATA_SUCCESS: return updateObject(state, {loading: false, data: action.data, error: null});
        case actionTypes.DASHBOARD_DATA_FAIL:    return updateObject(state, {loading: false, error: action.error});
        // VIDEO
        case actionTypes.DASHBOARD_VIDEO_DATA_START :  return updateObject(state, {videoLoading: true});
        case actionTypes.DASHBOARD_VIDEO_DATA_SUCCESS: return updateObject(state, {videoLoading: false, videoData: action.data, videoError: null});
        case actionTypes.DASHBOARD_VIDEO_DATA_FAIL:    return updateObject(state, {videoLoading: false, videoError: action.error});
        // NOTES
        case actionTypes.DASHBOARD_NOTES_DATA_START :  return updateObject(state, {notesLoading: true});
        case actionTypes.DASHBOARD_NOTES_DATA_SUCCESS: return updateObject(state, {notesLoading: false, notesData: action.data, notesError: null});
        case actionTypes.DASHBOARD_NOTES_DATA_FAIL:    return updateObject(state, {notesLoading: false, notesError: action.error});
        // PAPER
        case actionTypes.DASHBOARD_PAPER_DATA_START :  return updateObject(state, {paperLoading: true});
        case actionTypes.DASHBOARD_PAPER_DATA_SUCCESS: return updateObject(state, {paperLoading: false, paperData: action.data, paperError: null});
        case actionTypes.DASHBOARD_PAPER_DATA_FAIL:    return updateObject(state, {paperLoading: false, paperError: action.error});
        // NOTIFICATION
        case actionTypes.DASHBOARD_NOTIFICATION_START :  return updateObject(state, {notificationLoading: true});
        case actionTypes.DASHBOARD_NOTIFICATION_SUCCESS: return updateObject(state, {notificationLoading: false, notificationData: action.data, notificationError: null});
        case actionTypes.DASHBOARD_NOTIFICATION_FAIL:    return updateObject(state, {notificationLoading: false, notificationError: action.error});
        default: return state;
    }
}

export default reducer;