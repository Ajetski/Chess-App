import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import App from './components/App';
import configureStore from './store/configureStore';
import './index.css'

const store = configureStore();

// Log updates to store
// store.subscribe(state => {
// 	console.log('Redux state updated: ', state);
// });

const theme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
