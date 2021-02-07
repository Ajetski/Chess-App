import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from '../components/Navbar';


it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router>
		<Navbar />
	</Router>, div);
});
