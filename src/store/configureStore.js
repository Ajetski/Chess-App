import { createStore, combineReducers } from 'redux';
import Chess from 'chess.js';
import chessReducer from '../reducers/chessReducer';
import engineReducer from '../reducers/engineReducer';
import { setMaxDepth, updateEval, setEngine } from '../actions/engineActions';
import setChess from '../actions/chessActions';

export default function configureStore() {
	const store = createStore(
		combineReducers({ chess: chessReducer, engine: engineReducer })
	);

	store.dispatch(updateEval({
		evaluation: 0.00,
		bestmove: '',
		line: [],
		depth: 1
	}));

	store.dispatch(setEngine({
		engine: new Worker('stockfish.js')
	}));

	store.dispatch(setMaxDepth({
		maxDepth: 25
	}));

	store.dispatch(setChess({ chess: new Chess() }));

	return store;
}
