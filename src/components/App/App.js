import Board from '../Board/Board';
import BoardSettings from '../BoardSettings/BoardSettings';
import './App.css';

function App() {
	return (
		<div className="app">
			<div className="middle mx-auto mt-5">
				<Board />
				<BoardSettings />
			</div>
		</div>
	);
}

export default App;
