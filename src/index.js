import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import './index.css'

const store = configureStore();

// Log updates to store
// store.subscribe(state => {
// 	console.log('Redux state updated: ', state);
// });

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
