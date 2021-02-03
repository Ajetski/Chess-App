import { createStore, combineReducers } from 'redux';

import chessReducer from '../reducers/chessReducer';
import engineReducer from '../reducers/engineReducer';

export default function configureStore() {
	return createStore(
		combineReducers({ chess: chessReducer, engine: engineReducer })
	);
}
