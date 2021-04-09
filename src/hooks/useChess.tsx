import { ChessInstance, ShortMove } from 'chess.js';
import { useState } from 'react';

import { newChess, pgnToChess } from '../utils';

export type ChessValues = {
	chess: ChessInstance,
	orientation: 'white' | 'black',
}

export type UpdateChess = {
	move: (m: string | ShortMove) => void,
	undo: VoidFunction,
	reset: VoidFunction,
	setPgn: (pgn: string) => void,
	flip: VoidFunction,
	setOrientation: (o: 'black' | 'white') => void
};


export const useChess = (pgn?: string): [ ChessValues, UpdateChess ] => {
	const [chess, setChess] = useState(newChess(pgn));
	const [orientation, setOrientation] = useState<'white' | 'black'>('white')

	return [{ chess, orientation }, {
		move: m => {
			chess.move(m);
			setChess(pgnToChess(chess.pgn()));
		},
		undo: () => {
			chess.undo();
			setChess(pgnToChess(chess.pgn()));
		},
		reset: () => {
			chess.reset();
			setChess(pgnToChess(chess.pgn()));
		},
		setPgn: pgn => {
			setChess(pgnToChess(pgn));
		},
		flip: () => {
			setOrientation(orientation === 'white' ? 'black' : 'white');
		},
		setOrientation: o => {
			setOrientation(o);
		}
	}];
}

/*
if (engine) {
			engine.postMessage('stop');
			engine.postMessage(`position fen ${chess.fen()}`);
			engine.postMessage(`go depth ${maxDepth}`);

			// engine.postMessage(`go movetime 5000`);

			engine.onmessage = function (event) {
				const data = (event.data ? event.data : event).split(' ');
				if (data[0] === 'info' && setEval) {
					const startLineIdx = data.indexOf('pv') + 1;
					const startEvalIdx = data.indexOf('score') + 1;
					const colorMultiplier = chess.turn() === 'w' ? 1 : -1;
					setEval({
						depth: parseInt(data[2]),
						evaluation: data[startEvalIdx] === 'cp'
							? `${colorMultiplier * data[startEvalIdx + 1] / 100}` as string
							: `#${colorMultiplier * data[startEvalIdx + 1]}` as string,
						bestmove: data[startLineIdx],
						line: data.slice(startLineIdx, data.length - 3),
					});
				}
			};
		}
		*/