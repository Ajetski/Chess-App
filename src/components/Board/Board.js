/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Chessground } from 'chessground';
import { toDests, toColor, playOtherSide } from '../../utils';
import './styles/chessground.css';
import './styles/theme.css';
const Chess = require('chess.js');

export default function Board(props) {

	const [chess, setChess] = useState(new Chess());
	const [boardRef, setBoardRef] = useState();
	const [_, setBoard] = useState();

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
			})
			api.set({
				movable: { events: { after: playOtherSide(api, chess, setChess) } }
			});
			document.getElementsByClassName('cg-wrap').item(0).classList.add('blue2');
		}
	}, [boardRef, _]);

	return (
		<>
			<div ref={el => setBoardRef(() => el)}
				style={{
					width: props.width,
					height: props.height
				}}>
			</div>
			<p className="mt-4">
				{chess.pgn({ newline_char: '\n', max_width: 5 }).split('\n').map(row => (
					<span key={row}>{row}<br /></span>
				)) || 'No moves have been played...'}
				<br />
				{chess.fen()}
			</p>
			<div className="btn-group">
				<button type="button"
					className="btn btn-secondary "
					onClick={() => {
						const newChess = new Chess();
						newChess.load_pgn(chess.pgn());
						newChess.undo();
						setChess(() => newChess);
						setBoard(() => setBoard(() => Math.random()));
					}}>
					Takeback
				</button>
				<button type="button"
					className="btn btn-danger"
					onClick={() => {
						setChess(() => new Chess());
						setBoard(() => setBoard(() => Math.random()));
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