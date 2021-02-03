export function updateEval(payload) {
	return {
		type: 'engine/updateEval',
		depth: payload.depth,
		evaluation: payload.evaluation,
		bestmove: payload.bestmove,
		line: payload.line,
	};
}

export function setMaxDepth(payload) {
	return {
		type: 'engine/setMaxDepth',
		maxDepth: payload.maxDepth
	};
}

export function setEngine(payload) {
	return {
		type: 'engine/setEngine',
		engine: payload.engine
	};
}
