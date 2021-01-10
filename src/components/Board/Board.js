/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Chessground } from 'chessground';
import { toDests, toColor, copyChess } from '../../utils';
import setChessRedux from '../../actions/chessActions';
import './styles/chessground.css';
import './styles/theme.css';
const Chess = require('chess.js');

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
			document.getElementsByClassName('cg-wrap').item(0).classList.add('blue2');
		}
	}, [boardRef]);

	useEffect(() => {
		if (cg) {
			cg.set(config);
		}
		props.dispatch(setChessRedux({ chess }));
	}, [chess])

	return (
		<>
			<div ref={el => setBoardRef(() => el)}
				style={{
					width: props.width,
					height: props.height
				}}>
			</div>
			<div className="btn-group mt-3">
				<button type="button"
					className="btn btn-secondary "
					onClick={() => {
						chess.undo();
						const copy = copyChess(chess);
						setChess(() => copy);
					}}>
					Takeback
				</button>
				<button type="button"
					className="btn btn-danger"
					onClick={() => {
						setChess(() => new Chess());
					}}>
					Reset
				</button>
			</div>
		</>
	);
}

Board.defaultProps = {
	width: '720px',
	height: '720px'
};

function mapStateToProps(state, ownProps) {
	return { ...ownProps, chess: state.chess };
}

// const mapDispatchToProps = { setChessRedux };

export default connect(mapStateToProps)(Board);
