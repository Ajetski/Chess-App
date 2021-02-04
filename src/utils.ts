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

// export function aiPlay(cg: Api, chess: ChessInstance, delay, firstMove) {
// 	return (orig: Square, dest: Square) => {
// 		chess.move({ from: orig, to: dest });
// 		setTimeout(() => {
// 			const moves = chess.moves({ verbose: true });
// 			const move = firstMove ? moves[0] : moves[Math.floor(Math.random() * moves.length)];
// 			chess.move(move.san);
// 			cg.move(move.from, move.to);
// 			cg.set({
// 				turnColor: toColor(chess),
// 				movable: {
// 					color: toColor(chess),
// 					dests: toDests(chess)
// 				}
// 			});
// 			cg.playPremove();
// 		}, delay);
// 	};
// }

export function copyChess(chess: ChessInstance) {
	const copy = new Chess();
	copy.load_pgn(chess.pgn());
	return copy;
}

export function pgnToChess(pgn: string) {
	const copy = new Chess();
	copy.load_pgn(pgn);
	return copy;
}
