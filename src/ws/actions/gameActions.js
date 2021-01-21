export function newGame() {
	return JSON.stringify({
		type: 'game/newGame'
	});
}

export function makeMove({ id, move } = {}) {
	return JSON.stringify({
		type: 'game/move',
		id,
		move
	});
}

export function connectToGame({ id } = {}) {
	return JSON.stringify({
		type: 'game/connect',
		id
	});
}
