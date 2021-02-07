import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jsdom-worker';

import Analysis from '../components/Analysis';
import configureStore from '../store/configureStore'

const store = configureStore();


const TestAnalysis = () => (
	<Provider store={store}>
		<Analysis />
	</Provider>
);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestAnalysis />, div);
});
