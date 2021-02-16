/* eslint-disable react-hooks/exhaustive-deps */
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
		<div>
			<div>{`Analysis: Depth ${engine.depth}/${maxDepth}`} {
				engine.depth === maxDepth &&
				<button
					className="btn btn-info"
					onClick={() => setMaxDepth(maxDepth + 5)}>
					+
				</button>
			}
			</div>
			<div>Best Move: {engine.bestmove}</div>
			<div>Evaluaiton: {engine.evaluation}</div>
		</div>
	);
}

const mapStateToProps = (state: Store): EvaluaitonProps => ({
	chess: state.chess,
	engine: state.engine
});

export default connect(mapStateToProps)(Evaluation);
