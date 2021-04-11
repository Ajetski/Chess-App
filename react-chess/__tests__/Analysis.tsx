import { FC } from 'react';
import ReactDOM from 'react-dom';
import 'jsdom-worker';

import Analysis from '../components/Analysis';


const TestAnalysis: FC = () => (
	<Analysis />
);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestAnalysis />, div);
});
