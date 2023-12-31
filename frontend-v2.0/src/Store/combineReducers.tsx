import { combineReducers } from "redux";
import { SignUpReducer } from "./reducers/signUp";
import { freelancerDataReducer } from "./reducers/freelancerDataReducer";
import { clientDataReducer } from "./reducers/clientDataReducer";
import { jobsDataReducer } from "./reducers/jobsDataReducer";
import { jobDetailsReducer } from "./reducers/jobDetailsReducer";
import { langReducer } from "./reducers/langReducer";
import { jobDataReducer } from "./reducers/jobDataReducer";
import { clientJobReducer } from "./reducers/clientJobReducer";
import { inReviewReducer } from "./reducers/inReviewReducer";
import { freelancersDataReducer } from "./reducers/freelancersDataReducer";

export default combineReducers({
  //The Key is your type;
  //the value is reducer you will import
  // count:counterReducer,import { SignUpReducer } from './reducers/signUp';
  signUpData: SignUpReducer,
  freelancerData: freelancerDataReducer,
  clientData: clientDataReducer,
  jobsData: jobsDataReducer,
  lang: langReducer,
  jobData: jobDataReducer,
  clientJobs: clientJobReducer,
  jobDetails: jobDetailsReducer,
  inreview: inReviewReducer,
  freelancersData:freelancersDataReducer,
});
