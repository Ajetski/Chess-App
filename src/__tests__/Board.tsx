import { FC } from 'react';
import ReactDOM from 'react-dom';
import 'jsdom-worker';

import Board from '../components/Board';
import { useChess } from '../hooks/useChess';

const TestBoard: FC = () => {

	const [{ chess, orientation }, updateChess] = useChess();
	return (
		<Board chess={chess} orientation={orientation} updateChess={updateChess} />
	);
};

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestBoard />, div);
});
