import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import App from './components/App';
import configureStore from './store/configureStore';
import './index.scss'
import './spacing.scss';

const store = configureStore();

// store.subscribe(() => {
// 	console.log(store.getState());
// });

const theme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});

if (!localStorage.getItem('userId')) {
	localStorage.setItem('userId', uuidv4());
}

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
