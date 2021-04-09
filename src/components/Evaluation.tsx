/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import { ChessInstance } from 'chess.js';
import { useState, useEffect, FC } from 'react';

interface EvaluaitonProps {
	engine: {
		maxDepth: number,
		depth: number,
		engine: Worker,
		bestmove: string,
		evaluation: string
	},
	chess: ChessInstance
};

const Evaluation: FC<EvaluaitonProps> = ({ engine, chess }) => {
	const [maxDepth, setMaxDepth] = useState(engine.maxDepth);

	useEffect(() => {
		setMaxDepth(engine.maxDepth);
	}, [chess]);

	useEffect(() => {
		if (maxDepth !== engine.maxDepth)
			engine.engine.postMessage(`go depth ${engine.depth + 5}`);
	}, [maxDepth]);

	return (
		<>
			<div>{`Analysis: Depth ${engine.depth}/${maxDepth}`} {
				engine.depth === maxDepth &&
				<Button
					variant="info"
					onClick={() => setMaxDepth(maxDepth + 5)}>
					+
				</Button>
			}
			</div>
			<p>Best Move: {engine.bestmove}</p>
			<p>Evaluaiton: {engine.evaluation}</p>
		</>
	);
}

export default Evaluation;
