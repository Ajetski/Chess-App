import Board from './Board';
import BoardSettings from './BoardSettings';
import GameHistory from './GameHistory';

export default function Game() {
	return (
		<div className="row">
			<div className="col-xl-8 col-12">
				<div className="mx-auto" style={{ width: 'fit-content' }}>
					<Board />
					<BoardSettings />
				</div>
			</div>
			<div className="col-xl-4 mt-3">
				<GameHistory />
			</div>
		</div>
	);
}
