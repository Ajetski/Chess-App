import { ChessInstance } from "chess.js";
const Chess = require('chess.js');

let chessInstance: ChessInstance;

try {
	chessInstance = new Chess();
} catch {
	chessInstance = new Chess.Chess();
}

const initialState = {
	chess: chessInstance,
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
