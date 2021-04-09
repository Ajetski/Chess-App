import { FC } from 'react';
import ReactDOM from 'react-dom';
import 'jsdom-worker';

import Evaluation from '../components/Evaluation';
import { useChess } from '../hooks/useChess';

const TestEvaluation: FC = () => {
	const [{chess, orientation}, updateChess] = useChess();

	return (
		<Evaluation chess={chess} engine={{
			maxDepth: 0,
			bestmove: '',
			evaluation: '',
			depth: 0,
			engine: null as unknown as Worker
		}} />
	);
};

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestEvaluation />, div);
});
