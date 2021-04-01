/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChessInstance } from 'chess.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import env from '../env/env';
import { pgnToChess } from '../utils';
import { connectToGame, makeMove, stayConnected } from '../ws/actions/gameActions';
import { setOrientation, setChess } from '../actions/chessActions';
import Board from './Board';
import BoardSettings from './BoardSettings';
import GameHistory from './GameHistory';
import { Store } from '../store/types';

interface GameProps {
	dispatch: (arg0: any) => void,
	chess: ChessInstance
};

const Game: FC<GameProps> = ({ dispatch, chess }) => {
	const { gameId: gameIdStr } = useParams<{ gameId: string }>();
	const gameId = parseInt(gameIdStr);

	const [ws] = useState(new WebSocket(env.wsUrl));
	const [serverLastState, setServerLastState] = useState(chess.pgn());

	useEffect(() => {
		if (gameId) {
			ws.onopen = async () => {
				ws.send(connectToGame({
					id: gameId,
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
					dispatch(setOrientation({ orientation: action.orientation }));
					dispatch(setChess({ chess: pgnToChess(action.pgn) }));
					setServerLastState(chess.pgn());
				} else if (action.type === 'game/move') {
					setServerLastState(action.pgn);
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
				setServerLastState(chess.pgn());
			}
		}
	}, [chess]);

	return (
			<Row>
				<Col xl={8} xs={12}>
					<div className="mx-auto" style={{ width: 'fit-content' }}>
						<Board />
						<BoardSettings />
					</div>
				</Col>
				<Col xs xl={4} className="mt-3">
					<GameHistory />
				</Col>
			</Row>
	);
};

const mapStateToProps = (state: Store, ownProps: any): GameProps =>
	({ ...ownProps, chess: state.chess.chess });

export default connect(mapStateToProps)(Game);
