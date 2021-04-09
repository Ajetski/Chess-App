import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jsdom-worker';

import GameHistory from '../components/GameHistory';
import { useChess } from '../hooks/useChess';


const TestGameHistory = () => {
	const [{ chess }] = useChess();
	return (
		<GameHistory chess={chess} />
	);
}

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestGameHistory />, div);
});
