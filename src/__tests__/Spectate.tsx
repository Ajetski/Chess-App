import React from 'react';
import { Provider } from 'react-redux';
import { MatchRouter } from '../testUtils';
import 'jsdom-worker';

import Spectate from '../components/Spectate';
import configureStore from '../store/configureStore'

const store = configureStore();

const TestSpectate = () => (
    <Provider store={store}>
        <Spectate />
    </Provider>
);

it('renders without crashing', () => {
    MatchRouter(<TestSpectate />, "/game/watch/:gameId", "/game/watch/1");
});
