import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import App from './components/App';
import configureStore from './store/configureStore';
import './index.css'

const store = configureStore();

// store.subscribe(() => {
// 	console.log(store.getState());
// });

const theme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
