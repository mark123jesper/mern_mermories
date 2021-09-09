import { combineReducers } from "redux";

// initializing reducers from redux and collate all actions into one
// need to be index

import posts from './posts.js';
import auth from './auth.js';

export default combineReducers({posts, auth});