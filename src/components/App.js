import Board from './Board';
import BoardSettings from './BoardSettings';

export default function App() {
	return (
		<>
			<div>
				<p>some header</p>
			</div>
			<div className="fluid-container">
				<div className="col-2">

				</div>
				<div className="col-8 mx-auto">
					<div className="mx-auto" style={{ width: 'fit-content' }}>
						<Board />
						<BoardSettings />
					</div>
				</div>
				<div className="col-2">

				</div>
			</div>
		</>
	);
}
