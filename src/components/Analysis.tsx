import { FC } from 'react';

import Board from './Board';
import BoardSettings from './BoardSettings';
import Evaluation from './Evaluation';
import GameControl from './GameControl';
import GameHistory from './GameHistory';

const Analysis: FC = () => (
	<>
		<div className="col-xl-8 col-12">
			<div className="mx-auto" style={{ width: 'fit-content' }}>
				<Board analysisMode={true} />
				<BoardSettings />
			</div>
		</div>
		<div className="col-xl-4 mt-3">
			<Evaluation />
			<GameHistory />
			<GameControl />
		</div>
	</>
);

export default Analysis;
