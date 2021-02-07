import { createStore, combineReducers } from 'redux';

import chessReducer from '../reducers/chessReducer';
import engineReducer from '../reducers/engineReducer';
import modalReducer from '../reducers/modalReducer';

export default function configureStore() {
	return createStore(
		combineReducers({ chess: chessReducer, engine: engineReducer, modal: modalReducer })
	);
}
