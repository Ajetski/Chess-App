const initialState = {
	evaluation: 0.00,
	bestmove: '',
	line: [],
	depth: 1,
	engine: new Worker('/stockfish.js'),
	maxDepth: 18
}

export default function engineReducer(state = initialState, action: any) {
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
