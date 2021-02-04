const Chess = require('chess.js');

const initialState = {
	chess: new Chess(),
	orientation: 'white'
};

export default function chessReducer(state = initialState, action: any) {
	if (action.type === 'chess/setChess')
		return {
			...state,
			chess: action.chess
		};
	else if (action.type === 'chess/setOrientation')
		return {
			...state,
			orientation: action.orientation
		};
	return state;
}
