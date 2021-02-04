import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import GuardedRoute from '../components/GuardedRoute';


it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router>
		<GuardedRoute auth={true}>
			<div></div>
		</GuardedRoute>
	</Router>, div);
});
