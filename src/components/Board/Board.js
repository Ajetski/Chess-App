import React from 'react';
import { Chessground } from 'chessground';
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

	toDests() {
		const dests = new Map();
		this.chess.SQUARES.forEach(s => {
			const ms = this.chess.moves({ square: s, verbose: true });
			if (ms.length) dests.set(s, ms.map(m => m.to));
		});
		return dests;
	}

	toColor() {
		return (this.chess.turn() === 'w') ? 'white' : 'black';
	}

	componentDidMount() {
		this.api = Chessground(this.boardRef, {
			movable: {
				color: 'both',
				free: false,
				dests: this.toDests(),
			},
			draggable: {
				showGhost: true
			}
		});
	}
}

Board.defaultProps = {
	width: '720',
	height: '720'
};