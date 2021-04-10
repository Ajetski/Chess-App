import { ChessInstance, Square } from 'chess.js';
import { Api } from 'chessground/api';

const Chess = require('chess.js');

export function toDests(chess: ChessInstance) {
	const dests = new Map();
	chess.SQUARES.forEach(s => {
		const ms = chess.moves({ square: s, verbose: true });
		if (ms.length) dests.set(s, ms.map(m => m.to));
	});
	return dests;
}

export function toColor(chess: ChessInstance): 'white' | 'black' {
	return (chess.turn() === 'w') ? 'white' : 'black';

}

export function newChess(pgn?: string): ChessInstance {
	const _newChess = () => {
		try {
			return new Chess();
		} catch (err) {
			return new Chess.Chess();
		}
	}

	if (!pgn) {
		return _newChess();
	}
	const c: ChessInstance = _newChess();
	c.load_pgn(pgn);
	return c;
}

export function playOtherSide(cg: Api, chess: ChessInstance) {
	return (orig: Square, dest: Square) => {
		chess.move({ from: orig, to: dest });
		cg.set({
			turnColor: toColor(chess),
			movable: {
				color: toColor(chess),
				dests: toDests(chess)
			}
		});
	};
}

export function pgnToChess(pgn: string) {
	const copy = new Chess();
	copy.load_pgn(pgn);
	return copy;
}
