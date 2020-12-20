import React, { Component } from "react";
import PropTypes from "prop-types";
import { Move, Square } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor

import Chessboard from "chessboardjsx";



interface MyProps {
	children: any
}

interface MyState {
	pieceSquare: Square;
	history: Move[];
	fen: string,
	dropSquareStyle: any,
	squareStyles: any,
	square: Square;
}


class Game extends Component<MyProps, MyState> {
	static propTypes = { children: PropTypes.func };

	ChessReq: any = require('chess.js');

	state = {
		fen: "start",
		// square styles for active drop square
		dropSquareStyle: {},
		// custom square styles
		squareStyles: {},
		// square with the currently clicked piece
		pieceSquare: "" as Square,
		// currently clicked square
		square: "" as Square,
		// array of past game moves
		history: []
	};

	game: any;

	componentDidMount() {
		this.game = new this.ChessReq()
	}

	// keep clicked square style and remove hint squares
	removeHighlightSquare = () => {
		this.setState(({ pieceSquare, history }) => ({
			squareStyles: squareStyling({ pieceSquare, history })
		}));
	};

	// show possible moves
	highlightSquare = (sourceSquare: Square, squaresToHighlight: Square[]) => {
		const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
			(a, c) => {
				return {
					...a,
					...{
						[c]: {
							background:
								"radial-gradient(circle, #fffc00 36%, transparent 40%)",
							borderRadius: "50%"
						}
					},
					...squareStyling({
						history: this.state.history,
						pieceSquare: this.state.pieceSquare
					})
				};
			},
			{}
		);

		this.setState(({ squareStyles }) => ({
			squareStyles: { ...squareStyles, ...highlightStyles }
		}));
	};

	onDrop = ({ sourceSquare, targetSquare }: { sourceSquare: Square, targetSquare: Square }) => {
		// see if the move is legal
		let move = this.game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: "q" // always promote to a queen for example simplicity
		});

		// illegal move
		if (move === null) return;
		this.setState(({ history, pieceSquare }) => ({
			fen: this.game.fen(),
			history: this.game.history({ verbose: true }),
			squareStyles: squareStyling({ pieceSquare, history })
		}));
	};

	onMouseOverSquare = (square: Square) => {
		// get list of possible moves for this square
		let moves = this.game.moves({
			square: square,
			verbose: true
		});

		// exit if there are no moves available for this square
		if (moves.length === 0) return;

		let squaresToHighlight: Square[] = [];
		for (var i = 0; i < moves.length; i++) {
			squaresToHighlight.push(moves[i].to);
		}

		this.highlightSquare(square, squaresToHighlight);
	};

	onMouseOutSquare = (square: Square) => this.removeHighlightSquare(/*square*/);

	// central squares get diff dropSquareStyles
	onDragOverSquare = (square: Square) => {
		this.setState({
			dropSquareStyle:
				square === "e4" || square === "d4" || square === "e5" || square === "d5"
					? { backgroundColor: "cornFlowerBlue" }
					: { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
		});
	};

	onSquareClick = (square: Square) => {
		this.setState(({ history }) => ({
			squareStyles: squareStyling({ pieceSquare: square, history }),
			pieceSquare: square
		}));

		let move = this.game.move({
			from: this.state.pieceSquare,
			to: square,
			promotion: "q" // always promote to a queen for example simplicity
		});

		// illegal move
		if (move === null) return;

		this.setState({
			fen: this.game.fen(),
			history: this.game.history({ verbose: true }),
			pieceSquare: "" as Square
		});
	};

	onSquareRightClick = (square: Square) =>
		this.setState({
			squareStyles: { [square]: { backgroundColor: "deepPink" } }
		});

	calcWidth = ({ screenWidth, screenHeight }: { screenWidth: number, screenHeight: number }) => {
		return screenWidth / 2;
	}

	render() {
		const { fen, dropSquareStyle, squareStyles } = this.state;

		return this.props.children({
			squareStyles,
			position: fen,
			onMouseOverSquare: this.onMouseOverSquare,
			onMouseOutSquare: this.onMouseOutSquare,
			onDrop: this.onDrop,
			dropSquareStyle,
			onDragOverSquare: this.onDragOverSquare,
			onSquareClick: this.onSquareClick,
			onSquareRightClick: this.onSquareRightClick
		});
	}
}

export default function WithMoveValidation() {
	return (
		<div>
			<Game>
				{({
					position,
					onDrop,
					onMouseOverSquare,
					onMouseOutSquare,
					squareStyles,
					dropSquareStyle,
					onDragOverSquare,
					onSquareClick,
					onSquareRightClick,
					calcWidth
				}) => (
					<Chessboard
						id="game"
						position={position}
						onDrop={onDrop}
						onMouseOverSquare={onMouseOverSquare}
						onMouseOutSquare={onMouseOutSquare}
						boardStyle={{
							borderRadius: "5px",
							boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
						}}
						squareStyles={squareStyles}
						dropSquareStyle={dropSquareStyle}
						onDragOverSquare={onDragOverSquare}
						onSquareClick={onSquareClick}
						onSquareRightClick={onSquareRightClick}
						calcWidth={calcWidth}
					/>
				)}
			</Game>
		</div>
	);
}

const squareStyling = ({ pieceSquare, history }: { pieceSquare: Square, history: Move[] }) => {
	const sourceSquare = history.length && history[history.length - 1].from;
	const targetSquare = history.length && history[history.length - 1].to;

	return {
		[pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
		...(history.length && {
			[sourceSquare]: {
				backgroundColor: "rgba(255, 255, 0, 0.4)"
			}
		}),
		...(history.length && {
			[targetSquare]: {
				backgroundColor: "rgba(255, 255, 0, 0.4)"
			}
		})
	};
};
