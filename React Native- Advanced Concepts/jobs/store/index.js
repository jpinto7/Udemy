import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducers from '../reducers';

const initialState = {};

export const store = createStore(
	reducers,
	initialState,
	compose(
		applyMiddleware(thunk)
	)
);

export const persistor = persistStore(store);
