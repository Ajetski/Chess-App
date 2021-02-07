import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jsdom-worker';

import Board from '../components/Board';
import configureStore from '../store/configureStore'

const store = configureStore();


const TestBoard = () => (
	<Provider store={store}>
		<Board />
	</Provider>
);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestBoard />, div);
});
