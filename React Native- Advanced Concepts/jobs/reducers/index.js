import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './auth.reducer';
import jobs from './jobs.reducer';
import likes from './likes.reducer';

const config = {
	key: 'root',
	storage,
	whitelist: ['likes']
};

export default persistCombineReducers(config, {
	auth,
	likes,
	jobs
});
