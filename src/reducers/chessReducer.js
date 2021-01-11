export default function chessReducer(state = {}, action) {
	if (action.type === 'chess/set')
		return {
			...state,
			chess: action.chess
		};
	return state;
}
