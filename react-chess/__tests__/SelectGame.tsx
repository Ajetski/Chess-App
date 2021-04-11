import React from 'react';
import ReactDOM from 'react-dom';
import SelectGame from '../components/SelectGame';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SelectGame />, div);
});
