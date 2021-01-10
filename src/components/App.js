import Board from './Board';
import BoardSettings from './BoardSettings';
import GameHistory from './GameHistory';

export default function App() {
	return (
		<div className="container">
			<div className="row">
				<p>some header</p>
			</div>
			<div className="row">
				<div className="col-8">
					<div className="mx-auto" style={{ width: 'fit-content' }}>
						<Board />
						<BoardSettings />
					</div>
				</div>
				<div className="col-4">
					<GameHistory />
				</div>
			</div>
		</div>
	);
}
