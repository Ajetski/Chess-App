/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { ChessInstance } from 'chess.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Board from './Board';
import BoardSettings from './BoardSettings';
import GameHistory from './GameHistory';
import { useOnlineChess } from '../hooks/useOnlineChess';

interface GameProps {
	dispatch: (arg0: any) => void,
	chess: ChessInstance
};

const Game: FC<GameProps> = () => {
	const { gameId } = useParams<{ gameId: string }>();
	const [{chess, orientation}, updateChess] = useOnlineChess(parseInt(gameId));

	return (
		<Row>
			<Col xl={8} xs={12}>
				<div className="mx-auto" style={{ width: 'fit-content' }}>
					<Board chess={chess}
						updateChess={updateChess}
						orientation={orientation} />
					<BoardSettings />
				</div>
			</Col>
			<Col xs xl={4} className="mt-3">
				<GameHistory chess={chess} />
			</Col>
		</Row>
	);
};

export default Game;
