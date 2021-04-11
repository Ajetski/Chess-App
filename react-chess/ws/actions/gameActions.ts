export function newGame() {
	return JSON.stringify({
		type: 'game/newGame'
	});
}

export function makeMove({ id, move }: { id: number, move: string }) {
	return JSON.stringify({
		type: 'game/move',
		id,
		move
	});
}

export function connectToGame({ id, isPlayer }: { id: number, isPlayer: boolean }) {
	return JSON.stringify({
		type: 'game/connect',
		id,
		isPlayer,
		userId: localStorage.getItem('userId')
	});
}

export function stayConnected() {
	return JSON.stringify({
		type: 'game/ping'
	});
}
