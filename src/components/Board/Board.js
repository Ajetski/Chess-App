/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Chessground } from 'chessground';

import { toDests, toColor, copyChess } from '../../utils';
import { setChess as setChessRedux } from '../../actions/chessActions';
import { updateEval } from '../../actions/engineActions';
import './styles/chessground.css';
import './styles/theme.css';

function Board(props) {
	const [chess, setChess] = useState(props.chess);
	const [cg, setCg] = useState();
	const [premove, setPremove] = useState(undefined);
	const [boardRef, setBoardRef] = useState();

	const config = {
		orientation: props.orientation,
		turnColor: toColor(chess),
		lastMove: chess.history({ verbose: true }).slice(-1).map(move => [move.from, move.to])[0],
		movable: {
			color: props.orientation,
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
		premovable: {
			enabled: props.premovesEnabled,
			events: {
				set: (orig, dest, metadata) => {
					setPremove(() => ({ from: orig, to: dest }));
				},
				unset: () => {
					setPremove(() => undefined);
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
		if (cg) {
			cg.set(config);
		}

		if (premove) {
			props.chess.move(premove);
			cg.playPremove();
			setPremove(() => undefined);
			setChess(() => copyChess(props.chess));
		}
		else if (chess.pgn() !== props.chess.pgn()) {
			setChess(() => copyChess(props.chess));
		}

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
	}, [props.chess]);

	useEffect(() => {
		if (cg) {
			cg.set(config);
		}
	}, [props.orientation]);

	useEffect(() => {
		props.dispatch(setChessRedux({ chess }));
		if (cg) {
			console.log('set config', config);
			cg.set(config);
		}
	}, [chess]);

	return (
		<div ref={el => setBoardRef(() => el)}
			style={{
				width: props.width,
				height: props.height
			}}>
		</div>
	);
}

Board.defaultProps = {
	width: '720px',
	height: '720px'
};

function mapStateToProps(state, ownProps) {
	return {
		chess: state.chess.chess,
		orientation: state.chess.orientation,
		engine: state.engine.engine,
		maxDepth: state.engine.maxDepth,
		premovesEnabled: true,
		...ownProps
	};
}

export default connect(mapStateToProps)(Board);
