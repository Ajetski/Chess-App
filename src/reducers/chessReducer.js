import Chess from 'chess.js';

const initialState = { chess: new Chess() };

export default function chessReducer(state = initialState, action) {
	if (action.type === 'chess/set')
		return {
			...state,
			chess: action.chess
		};
	return state;
}
