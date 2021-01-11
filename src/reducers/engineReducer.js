export default function chessReducer(state = {}, action) {
	if (action.type === 'engine/updateEval')
		return {
			...state,
			depth: action.depth,
			evaluation: action.evaluation,
			bestmove: action.bestmove,
			line: action.line,
		};
	else if (action.type === 'engine/setMaxDepth')
		return {
			...state,
			maxDepth: action.maxDepth
		};
	else if (action.type === 'engine/setEngine')
		return {
			...state,
			engine: action.engine
		}
	return state;
}
