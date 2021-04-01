/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import { useState, useEffect, FC } from 'react';
import { connect } from 'react-redux';

import { Store, ChessStore, EngineStore } from '../store/types';

interface EvaluaitonProps {
	chess: ChessStore,
	engine: EngineStore
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

const mapStateToProps = (state: Store): EvaluaitonProps => ({
	chess: state.chess,
	engine: state.engine
});

export default connect(mapStateToProps)(Evaluation);
