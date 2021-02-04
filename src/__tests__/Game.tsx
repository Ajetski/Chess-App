import React from 'react';
import { Provider } from 'react-redux';
import { MatchRouter } from '../testUtils';
import 'jsdom-worker';

import Game from '../components/Game';
import configureStore from '../store/configureStore'

const store = configureStore();

const TestGame = () => (
	<Provider store={store}>
		<Game />
	</Provider>
);

it('renders without crashing', () => {
	MatchRouter(<TestGame />, "/game/:gameId", " / game / 1");
});
