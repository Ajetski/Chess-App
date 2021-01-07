export function toDests(chess) {
	const dests = new Map();
	chess.SQUARES.forEach(s => {
		const ms = chess.moves({ square: s, verbose: true });
		if (ms.length) dests.set(s, ms.map(m => m.to));
	});
	return dests;
}

export function toColor(chess) {
	return (chess.turn() === 'w') ? 'white' : 'black';

}

export function playOtherSide(cg, chess) {
	return (orig, dest) => {
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

export function aiPlay(cg, chess, delay, firstMove) {
	return (orig, dest) => {
		chess.move({ from: orig, to: dest });
		setTimeout(() => {
			const moves = chess.moves({ verbose: true });
			const move = firstMove ? moves[0] : moves[Math.floor(Math.random() * moves.length)];
			chess.move(move.san);
			cg.move(move.from, move.to);
			cg.set({
				turnColor: toColor(chess),
				movable: {
					color: toColor(chess),
					dests: toDests(chess)
				}
			});
			cg.playPremove();
		}, delay);
	};
}
