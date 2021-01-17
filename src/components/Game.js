/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';


import env from '../env';
import { connectToGame } from '../ws/actions/gameActions';
import Board from './Board';
import BoardSettings from './BoardSettings';
import GameHistory from './GameHistory';

function Game() {
	const { gameId } = useParams();

	useEffect(() => {
		if (gameId) {
			const ws = new WebSocket(env.apiUrl);
			ws.onopen = () => {
				ws.send(connectToGame({ id: gameId }));
			};

			ws.onmessage = (msg) => {
				console.log(msg);
			};
		}
	}, []);

	return (
		<>
			<div className="col-xl-8 col-12">
				<div className="mx-auto" style={{ width: 'fit-content' }}>
					<Board />
					<BoardSettings />
				</div>
			</div>
			<div className="col-xl-4 mt-3">
				<GameHistory />
			</div>
		</>
	);
}

export default connect()(Game);
