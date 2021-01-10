export default function setChess(payload = {}) {
	return {
		type: 'chess/set',
		chess: payload.chess
	};
}