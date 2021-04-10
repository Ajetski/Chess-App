import { ChessInstance, ShortMove } from 'chess.js';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import { newChess, pgnToChess } from '../utils';
import MoveSound from '../assets/sounds/Move.ogg';
import CaptureSound from '../assets/sounds/Capture.ogg';
import GameFinishedSound from '../assets/sounds/GenericNotify.ogg';

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


export const useChess = (pgn?: string, analysis = false): [ ChessValues, UpdateChess ] => {
	const [chess, setChess] = useState(newChess(pgn));
	const [orientation, setOrientation] = useState<'white' | 'black'>('white')
	const [playMoveSound] = useSound(MoveSound);
	const [playCaptureSound] = useSound(CaptureSound);
	const [playGameFinishedSound] = useSound(GameFinishedSound);

	useEffect(() => {
		// push to async task queue to wait for useState setterfn updates to be done
		setTimeout(() => {
			const theme = localStorage.getItem('piece-theme') as string;
			const pieces = document.getElementsByTagName('piece');
			for (let i = 0; i < pieces.length; i++) {
				const piece = pieces.item(i);
				if (piece) {
					piece.classList.add(theme);
				}
			}
		});
	}, [chess, orientation]);

	return [{ chess, orientation }, {
		move: m => {
			chess.move(m);
			setChess(pgnToChess(chess.pgn()));
			if (chess && chess.history().length >= 1) {
				if (chess.game_over()) {
					playGameFinishedSound();
				}
				else if (chess.in_check() || chess.history().slice(-1)[0].indexOf('x') !== -1) {
					playCaptureSound();
				} else {
					playMoveSound();
				}
			}
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