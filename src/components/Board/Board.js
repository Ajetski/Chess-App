import { useState, useEffect } from 'react';
import { Chessground } from 'chessground';
import { toDests, playOtherSide } from '../../utils';
import './styles/chessground.css';
import './styles/theme.css';
const Chess = require('chess.js');

export default function Board(props) {

	const [chess] = useState(new Chess());
	const [boardRef, setBoardRef] = useState();

	useEffect(() => {
		if (boardRef) {
			const api = Chessground(boardRef, {
				movable: {
					color: 'white',
					free: false,
					dests: toDests(chess),
				},
				draggable: {
					showGhost: true
				}
			})
			api.set({
				movable: { events: { after: playOtherSide(api, chess) } }
			});
			document.getElementsByClassName('cg-wrap').item(0).classList.add('blue2');
		}
	}, [boardRef, chess]);

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