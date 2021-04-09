import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import App from './components/App';
import './index.scss'
import './spacing.scss';


const theme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});

if (!localStorage.getItem('userId')) {
	localStorage.setItem('userId', uuidv4());
}

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
	document.getElementById('root')
);
