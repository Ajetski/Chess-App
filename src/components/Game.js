/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Board from './Board';
import BoardSettings from './BoardSettings';
import GameHistory from './GameHistory';

export default function Game() {
	const { gameId } = useParams();

	useEffect(() => {
		if (gameId) {
			// connect to server for game
		}
	}, []);

	return (
		<div className="row">
			<div className="col-xl-8 col-12">
				<div className="mx-auto" style={{ width: 'fit-content' }}>
					<Board />
					<BoardSettings />
				</div>
			</div>
			<div className="col-xl-4 mt-3">
				<GameHistory />
			</div>
		</div>
	);
}
