/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent as Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Chessground } from 'chessground';
import { Api } from 'chessground/api';
import { ChessInstance, ShortMove } from 'chess.js';
import useSound from 'use-sound';

import { toDests, toColor, copyChess } from '../../utils';
import { setChess as setChessRedux } from '../../actions/chessActions';
import { updateEval } from '../../actions/engineActions';
import './styles/chessground.css';
import './styles/theme.css';
import { Square } from 'chess.js';
import { Config } from 'chessground/config';
import { Key, SetPremoveMetadata } from 'chessground/types';
import { Store } from '../../store/types';

import MoveSound from './sounds/Move.ogg';
import CaptureSound from './sounds/Capture.ogg';

interface BoardProps {
	chess: ChessInstance,
	orientation: 'white' | 'black',
	width: string,
	height: string,
	spectateMode: boolean,
	analysisMode: boolean,
	maxDepth: number,
	engine: Worker,
	dispatch: (arg0: any) => void
};


const Board: Component<BoardProps> = (props) => {
	const [chess, setChess] = useState(props.chess);
	const [cg, setCg] = useState<Api>();
	const [premove, setPremove] = useState<ShortMove>();
	const [boardRef, setBoardRef] = useState<HTMLDivElement>();
	const [playMoveSound] = useSound(MoveSound);
	const [playCaptureSound] = useSound(CaptureSound);

	const config: Config = {
		orientation: props.orientation,
		turnColor: toColor(chess),
		lastMove: chess.history({ verbose: true }).slice(-1).map(move => [move.from, move.to])[0],
		viewOnly: props.spectateMode,
		movable: {
			color: props.analysisMode ? toColor(chess) : props.orientation,
			free: false,
			dests: toDests(chess),
			events: {
				after: (orig: Key, dest: Key, metadata: SetPremoveMetadata | undefined) => {
					chess.move({ from: orig as Square, to: dest as Square });
					const copy = copyChess(chess);
					setChess(copy);
				}
			}
		},
		premovable: {
			events: {
				set: (orig: Key, dest: Key, metadata: SetPremoveMetadata | undefined) => {
					setPremove({ from: orig as Square, to: dest as Square });
				},
				unset: () => {
					setPremove(undefined);
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
			setCg(api);
			const board = document.getElementsByClassName('cg-wrap').item(0);
			if (board)
				board.classList.add(localStorage.getItem('board-theme') || 'blue2');
		}
	}, [boardRef]);

	useEffect(() => {
		if (cg) {
			cg.set(config);
		}

		if (premove && cg) {
			props.chess.move(premove);
			cg.playPremove();
			setPremove(undefined);
			setChess(copyChess(props.chess));
		}
		else if (chess.pgn() !== props.chess.pgn()) {
			setChess(copyChess(props.chess));
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
						? `${colorMultiplier * data[startEvalIdx + 1] / 100}` as string
						: `#${colorMultiplier * data[startEvalIdx + 1]}` as string,
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
			cg.set(config);
		}

		if (chess && chess.history().length >= 1) {
			if (chess.in_check() || chess.history().slice(-1)[0].indexOf('x') !== -1) {
				playCaptureSound();
			} else {
				playMoveSound();
			}
		}
	}, [chess]);

	return (
		<div ref={(el) => {
			if (el) setBoardRef(el);
		}}
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

const mapStateToProps = (state: Store, ownProps: any) => {
	return {
		chess: state.chess.chess,
		orientation: state.chess.orientation,
		engine: state.engine.engine,
		maxDepth: state.engine.maxDepth,
		analysisMode: false,
		spectateMode: false,
		...ownProps
	};
}

export default connect(mapStateToProps)(Board);
