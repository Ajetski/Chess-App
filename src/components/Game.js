/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import env from '../env/env';
import { pgnToChess } from '../utils';
import { connectToGame, makeMove } from '../ws/actions/gameActions';
import { setOrientation, setChess } from '../actions/chessActions';
import Board from './Board';
import BoardSettings from './BoardSettings';
import GameHistory from './GameHistory';

function Game({ dispatch, chess }) {
	const { gameId } = useParams();

	const [ws] = useState(new WebSocket(env.wsUrl));
	const [serverLastState, setServerLastState] = useState(chess.pgn());

	useEffect(() => {
		if (gameId) {
			ws.onopen = () => {
				ws.send(connectToGame({ id: gameId }));
			}
			ws.onmessage = ({ data }) => {
				const action = JSON.parse(data);
				if (action.type === 'game/connect') {
					dispatch(setOrientation({ orientation: action.orientation }));
					dispatch(setChess({ chess: pgnToChess(action.pgn) }));
					setServerLastState(() => chess.pgn());
				} else if (action.type === 'game/move') {
					setServerLastState(() => action.pgn);
					dispatch(setChess({ chess: pgnToChess(action.pgn) }));
				}
			};
		}
		return () => {
			ws.close();
		}
	}, []);

	useEffect(() => {
		const [move] = chess.history().slice(-1);
		if (move && serverLastState !== chess.pgn()) {
			console.log(`send move: ${move}`);
			if (ws.readyState === 1) {  //if connection is open
				ws.send(makeMove({ id: gameId, move }));
				setServerLastState(() => chess.pgn());
			}
		}
	}, [chess]);

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
};

const mapStateToProps = (state, ownProps) => ({ ...ownProps, chess: state.chess.chess });

export default connect(mapStateToProps)(Game);
