import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jsdom-worker';

import GameControl from '../components/GameControl';
import configureStore from '../store/configureStore'

const store = configureStore();


const TestGameControl = () => (
	<Provider store={store}>
		<GameControl />
	</Provider>
);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestGameControl />, div);
});
