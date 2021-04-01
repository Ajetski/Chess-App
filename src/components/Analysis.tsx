import { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Board from './Board';
import BoardSettings from './BoardSettings';
import Evaluation from './Evaluation';
import GameControl from './GameControl';
import GameHistory from './GameHistory';

const Analysis: FC = () => (
	<Row>
		<Col xs={12} xl={8}>
			<div className="mx-auto" style={{ width: 'fit-content' }}>
				<Board analysisMode={true} />
				<BoardSettings />
			</div>
		</Col>
		<Col xl={4} className="mt-3">
			<Evaluation />
			<GameHistory />
			<GameControl />
		</Col>
	</Row>
);

export default Analysis;
