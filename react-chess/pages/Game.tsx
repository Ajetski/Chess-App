import { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Board from '../components/Board';
import BoardSettings from '../components/BoardSettings';
import GameHistory from '../components/GameHistory';
import { useOnlineChess } from '../hooks/useOnlineChess';

const Game: FC = () => {
	// const { gameId } = useParams<{ gameId: string }>();
	const gameId = '0';
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
