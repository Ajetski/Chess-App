/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import setChess from '../actions/chessActions';
import { copyChess } from '../utils';

function GameHistory({ chess, engine, dispatch }) {
	const [maxDepth, setMaxDepth] = useState(engine.maxDepth);

	useEffect(() => {
		setMaxDepth(() => engine.maxDepth);
	}, [chess]);

	useEffect(() => {
		if (maxDepth !== engine.maxDepth)
			engine.engine.postMessage(`go depth ${engine.depth + 5}`);
	}, [maxDepth]);

	return (
		<>
			<div>
				<div>{`Analysis: Depth ${engine.depth}/${maxDepth}`} {
					engine.depth === maxDepth &&
					<button
						className="btn btn-info"
						onClick={() => setMaxDepth(() => maxDepth + 5)}>
						+
					</button>
				}
				</div>
				<div>Best Move: {engine.bestmove}</div>
				<div>Evaluaiton: {engine.evaluation}</div>
			</div>
			{chess ?
				<div className="mt-3 mb-2">
					{chess.pgn({ newline_char: '\n', max_width: 5 }).split('\n').map(row => (
						<div key={row}>{row}</div>
					)) || 'No moves have been played...'}
				</div> : <p>chess is undefined</p>
			}
			<div className="btn-group mt-3">
				<button type="button"
					className="btn btn-secondary "
					onClick={() => {
						chess.undo();
						const copy = copyChess(chess);
						dispatch(setChess({ chess: copy }));
					}}>
					Takeback
				</button>
				<button type="button"
					className="btn btn-danger"
					onClick={() => {
						chess.reset();
						const copy = copyChess(chess);
						dispatch(setChess({ chess: copy }));
					}}>
					Reset
				</button>
			</div>
		</>
	);
}

function mapStateToProps(state) {
	return {
		chess: state.chess.chess,
		engine: state.engine
	};
}

export default connect(mapStateToProps)(GameHistory)
