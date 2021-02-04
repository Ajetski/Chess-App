import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jsdom-worker';

import GameHistory from '../components/GameHistory';
import configureStore from '../store/configureStore'

const store = configureStore();


const TestGameHistory = () => (
	<Provider store={store}>
		<GameHistory />
	</Provider>
);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestGameHistory />, div);
});
