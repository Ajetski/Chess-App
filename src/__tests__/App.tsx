import ReactDOM from 'react-dom';
import 'jsdom-worker';

import App from '../components/App';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
});
