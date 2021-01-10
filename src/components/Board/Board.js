/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Chessground } from 'chessground';
import { toDests, toColor, playOtherSide, copyChess } from '../../utils';
import './styles/chessground.css';
import './styles/theme.css';
const Chess = require('chess.js');

export default function Board(props) {

	const [chess, setChess] = useState(new Chess());
	const [cg, setCg] = useState();
	const [boardRef, setBoardRef] = useState();

	useEffect(() => {
		if (boardRef) {
			const api = Chessground(boardRef, {
				turnColor: toColor(chess),
				movable: {
					color: toColor(chess),
					free: false,
					dests: toDests(chess),
				},
				draggable: {
					showGhost: true
				},
				fen: chess.fen()
			});
			api.set({
				movable: { events: { after: playOtherSide(api, chess, setChess) } }
			});
			setCg(() => api);
			document.getElementsByClassName('cg-wrap').item(0).classList.add('blue2');
		}
	}, [boardRef]);

	useEffect(() => {
		if (cg) {
			cg.set({
				turnColor: toColor(chess),
				movable: {
					color: toColor(chess),
					free: false,
					dests: toDests(chess),
					events: { after: playOtherSide(cg, chess, setChess) }
				},
				draggable: {
					showGhost: true
				},
				fen: chess.fen()
			});
		}
	}, [chess])

	return (
		<>
			<div ref={el => setBoardRef(() => el)}
				style={{
					width: props.width,
					height: props.height
				}}>
			</div>
			<div className="mt-3 mb-2">
				{chess.pgn({ newline_char: '\n', max_width: 5 }).split('\n').map(row => (
					<div key={row}>{row}</div>
				)) || 'No moves have been played...'}
				{chess.fen()}
			</div>
			<div className="btn-group">
				<button type="button"
					className="btn btn-secondary "
					onClick={() => {
						const copy = copyChess(chess);
						copy.undo();
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
