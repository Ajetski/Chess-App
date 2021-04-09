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
	if (!pgn) return Chess();
	const c: ChessInstance = new Chess();
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
