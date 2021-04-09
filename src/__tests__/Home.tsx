import ReactDOM from 'react-dom';
import 'jsdom-worker';

import Home from '../components/Home';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
});
