import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import vidLecReducer from "./containers/LMS/Lectures/VideoLectures/store/reducer";
import paperLecReducer from "./containers/LMS/Lectures/PapersLectures/store/reducer";
import notesLecReducer from "./containers/LMS/Lectures/NotesLectures/store/reducer";
import authReducer from "./store/reducer/auth";
import lectureReducer from "./store/reducer/lecture";
import profileReducer from "./containers/LMS/Profile/store/reducer";
import streamLecReducer from "./containers/LMS/StreamLecture/store/reducer";
import messageReducer from "./containers/LMS/Messages/store/reducer";
import dashboardReducer from "./containers/LMS/Dashboard/store/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  videoLec: vidLecReducer,
  paperLec: paperLecReducer,
  notesLec: notesLecReducer,
  auth: authReducer,
  lec: lectureReducer,
  profile: profileReducer,
  stream: streamLecReducer,
  dashboard: dashboardReducer,
  message: messageReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
