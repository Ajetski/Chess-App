import { useState, useEffect } from 'react';

import { ChessValues, useChess } from './useChess';
import { connectToGame, makeMove, stayConnected } from '../ws/actions/gameActions';
import env from '../env/env';
import { ShortMove } from 'chess.js';

export type UpdateOnlineChess = {
	move: (m: string | ShortMove) => void,
};

export const useOnlineChess = (id: number): [ChessValues, UpdateOnlineChess] => {
	const [{ chess, orientation }, updateChess] = useChess();

	const [ws] = useState(new WebSocket(env.wsUrl));

	useEffect(() => {
		if (id) {
			ws.onopen = async () => {
				ws.send(connectToGame({
					id,
					isPlayer: true
				}));
				while (ws.readyState === 1) {
					ws.send(stayConnected());
					await new Promise<void>(resolve =>
						setTimeout(() => resolve(), 15000));
				}
			}
			ws.onmessage = ({ data }) => {
				const action = JSON.parse(data);
				if (action.type === 'game/connect') {
					updateChess.setOrientation(action.pgn);
				} else if (action.type === 'game/move') {
					updateChess.setPgn(action.pgn);
				}
			};
		}
		return () => {
			ws.close();
		}
	}, [ws, id, updateChess]);

	return [{ chess, orientation }, {
		move: m => {
			if (ws.readyState === 1) {
				updateChess.move(m);
				ws.send(makeMove({ id, move: chess.history().splice(-1)[0] }));
			}
		},
		// offerTakeback: () => {

		// },
		// offerDraw: () => {

		// },
		// resign: () => {

		// }
	}]
};
