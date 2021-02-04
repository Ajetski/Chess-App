import React from 'react';
import ReactDOM from 'react-dom';
import BoardSettings from '../components/BoardSettings';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<BoardSettings />, div);
});
