// const Chess = require('chess.js');

import Chess from 'chess.js';

const initialState = { chess: new Chess() }

export default function chessReducer(state = initialState, action) {
	// Check to see if the reducer cares about this action
	if (action.type === 'chess/set')
		return {
			...state,
			chess: action.chess
		};
	// otherwise return the existing state unchanged
	return state;
}
