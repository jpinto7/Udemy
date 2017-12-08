import { combineReducers } from 'redux';
import auth from './auth.reducer';
import jobs from './jobs.reducer';
import likes from './likes.reducer';

export default combineReducers({
	auth,
	likes,
	jobs
});
