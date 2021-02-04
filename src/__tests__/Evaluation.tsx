import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jsdom-worker';

import Evaluation from '../components/Evaluation';
import configureStore from '../store/configureStore'

const store = configureStore();

const TestEvaluation = () => (
	<Provider store={store}>
		<Evaluation />
	</Provider>
);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestEvaluation />, div);
});
