/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import env from '../env';
import { pgnToChess } from '../utils';
import { connectToGame } from '../ws/actions/gameActions';
import { setOrientation, setChess } from '../actions/chessActions';
import Board from './Board';
import BoardSettings from './BoardSettings';
import GameHistory from './GameHistory';

function Game({ dispatch }) {
	const { gameId } = useParams();

	const [ws] = useState(new WebSocket(env.apiUrl));

	useEffect(() => {
		if (gameId) {
			ws.onopen = () => {
				ws.send(connectToGame({ id: gameId }));
			}
			ws.onmessage = ({ data }) => {
				const action = JSON.parse(data);
				if (action.type === 'game/connect') {
					console.log(action);
					dispatch(setOrientation({ orientation: action.orientation }));
					dispatch(setChess({ chess: pgnToChess(action.pgn) }));
				}
			};
		}
		return () => {
			ws.close();
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

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps
	};
}

export default connect(mapStateToProps)(Game);
