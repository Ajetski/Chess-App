/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Board from '../components/Board';
import BoardSettings from '../components/BoardSettings';
import GameHistory from '../components/GameHistory';
import { useOnlineChess } from '../hooks/useOnlineChess';

const Spectate: FC = () => {
	const { gameId } = useParams<{ gameId: string }>();
	const [{chess, orientation}, updateChess] = useOnlineChess(parseInt(gameId));

	return (
		<Row>
			<Col xl={8} xs={12}>
				<div className="mx-auto" style={{ width: 'fit-content' }}>
					<Board chess={chess}
                        spectateMode={true}
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

export default Spectate;
