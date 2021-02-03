export function updateEval({ depth, evaluation, bestmove, line }: {
	depth: number,
	evaluation: string,
	bestmove: string,
	line: string[]
}) {
	return {
		type: 'engine/updateEval',
		depth,
		evaluation,
		bestmove,
		line
	};
}

export function setMaxDepth({ maxDepth }: { maxDepth: number }) {
	return {
		type: 'engine/setMaxDepth',
		maxDepth
	};
}

export function setEngine({ engine }: { engine: Worker }) {
	return {
		type: 'engine/setEngine',
		engine
	};
}
