import { ChessInstance } from 'chess.js';

export function setChess({ chess }: { chess: ChessInstance }) {
	return {
		type: 'chess/setChess',
		chess
	};
}

export function setOrientation({ orientation }: { orientation: 'white' | 'black' }) {
	return {
		type: 'chess/setOrientation',
		orientation
	};
}
