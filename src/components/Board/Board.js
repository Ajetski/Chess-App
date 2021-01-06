import React from 'react';
import { Chessground } from 'chessground';
import { toDests, playOtherSide } from '../../utils';
import './styles/chessground.css';
import './styles/theme.css';
const Chess = require('chess.js');

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.chess = new Chess();
	}

	render() {
		return (
			<div ref={el => this.boardRef = el}
				style={{
					width: this.props.width,
					height: this.props.height
				}}>
			</div>
		);
	}

	componentDidMount() {
		this.cg = Chessground(this.boardRef, {
			movable: {
				color: 'white',
				free: false,
				dests: toDests(this.chess),
			},
			draggable: {
				showGhost: true
			}
		});
		this.cg.set({
			movable: { events: { after: playOtherSide(this.cg, this.chess) } }
		});
		document.getElementsByClassName('cg-wrap').item(0).classList.add('blue2');
	}
}

Board.defaultProps = {
	width: '720px',
	height: '720px'
};