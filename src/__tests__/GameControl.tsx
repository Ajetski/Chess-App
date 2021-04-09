import { FC } from 'react';
import ReactDOM from 'react-dom';
import 'jsdom-worker';

import GameControl from '../components/GameControl';
import { useChess } from '../hooks/useChess';


const TestGameControl: FC = () => {
	const [, updateChess] = useChess();

	return (
		<GameControl updateChess={updateChess} />
	);
};

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestGameControl />, div);
});
