import { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Board from '../../components/Board';
import BoardSettings from '../../components/BoardSettings';
// import Evaluation from './Evaluation';
import GameControl from '../../components/GameControl';
import GameHistory from '../../components/GameHistory';
import { useChess } from '../../hooks/useChess';

const Analysis: FC = () => {
	const [{ chess, orientation }, updateChess] = useChess();

	return (
		<Row>
			<Col xs={12} xl={8}>
				<div className="mx-auto" style={{ width: 'fit-content' }}>
					<Board analysisMode={true} chess={chess} updateChess={updateChess} orientation={orientation} spectateMode={false} />
					<BoardSettings />
				</div>
			</Col>
			<Col xl={4} className="mt-3">
				{/* <Evaluation /> */}
				<GameHistory chess={chess} />
				<GameControl updateChess={updateChess} />
			</Col>
		</Row>
	);
}

export default Analysis;
