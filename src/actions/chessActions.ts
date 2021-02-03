export function setChess(payload) {
	return {
		type: 'chess/setChess',
		chess: payload.chess
	};
}

export function setOrientation(payload) {
	return {
		type: 'chess/setOrientation',
		orientation: payload.orientation
	};
}
