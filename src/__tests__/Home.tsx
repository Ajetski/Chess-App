import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jsdom-worker';

import Home from '../components/Home';
import configureStore from '../store/configureStore';

const store = configureStore();

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
        <Home />
    </Provider>, div);
});
