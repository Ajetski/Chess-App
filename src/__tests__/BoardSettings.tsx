import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jsdom-worker';

import BoardSettings from '../components/BoardSettings';
import configureStore from '../store/configureStore';

const store = configureStore();


it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Provider store={store}>
		<BoardSettings />
	</Provider>, div);
});
