export function newGame() {
	return JSON.stringify({
		type: 'game/newGame'
	});
}

export function makeMove(payload = {}) {
	return JSON.stringify({
		type: 'game/move',
		pgn: payload.pgn
	});
}

export function connectToGame(payload = {}) {
	return JSON.stringify({
		type: 'game/connect',
		id: payload.id
	});
}
