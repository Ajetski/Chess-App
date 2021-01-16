/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Chessground } from 'chessground';

import { toDests, toColor, copyChess } from '../../utils';
import setChessRedux from '../../actions/chessActions';
import { updateEval } from '../../actions/engineActions';
import './styles/chessground.css';
import './styles/theme.css';

function Board(props) {
	const [chess, setChess] = useState(props.chess);
	const [cg, setCg] = useState();
	const [boardRef, setBoardRef] = useState();

	const config = {
		turnColor: toColor(chess),
		movable: {
			color: toColor(chess),
			free: false,
			dests: toDests(chess),
			events: {
				after: (orig, dest) => {
					chess.move({ from: orig, to: dest });
					const copy = copyChess(chess);
					setChess(() => copy);
				}
			}
		},
		draggable: {
			showGhost: true
		},
		fen: chess.fen()
	};

	useEffect(() => {
		if (boardRef) {
			const api = Chessground(boardRef, config);
			setCg(() => api);
			document.getElementsByClassName('cg-wrap').item(0).classList.add(localStorage.getItem('board-theme') || 'blue2');
		}
	}, [boardRef]);

	useEffect(() => {
		if (chess === props.chess && chess.history().length > 0)
			return;

		if (cg) {
			cg.set(config);
		}

		//update global state
		props.dispatch(setChessRedux({ chess }));
		props.engine.postMessage('stop');
		props.engine.postMessage(`position fen ${chess.fen()}`);
		props.engine.postMessage(`go depth ${props.maxDepth}`);
		// props.engine.postMessage(`go movetime 5000`);

		props.engine.onmessage = function (event) {
			const data = (event.data ? event.data : event).split(' ');
			if (data[0] === 'info') {
				const startLineIdx = data.indexOf('pv') + 1;
				const startEvalIdx = data.indexOf('score') + 1;
				const colorMultiplier = chess.turn() === 'w' ? 1 : -1;
				props.dispatch(updateEval({
					depth: parseInt(data[2]),
					evaluation: data[startEvalIdx] === 'cp'
						? colorMultiplier * data[startEvalIdx + 1] / 100
						: `#${colorMultiplier * data[startEvalIdx + 1]}`,
					bestmove: data[startLineIdx],
					line: data.slice(startLineIdx, data.length - 3),
				}));
			}
		};
	}, [chess, props.chess])

	return (
		<>
			<div ref={el => setBoardRef(() => el)}
				style={{
					width: props.width,
					height: props.height
				}}>
			</div>
		</>
	);
}

Board.defaultProps = {
	width: '720px',
	height: '720px'
};

function mapStateToProps(state, ownProps) {
	return {
		...ownProps,
		chess: state.chess.chess,
		engine: state.engine.engine,
		maxDepth: state.engine.maxDepth
	};
}

export default connect(mapStateToProps)(Board);
