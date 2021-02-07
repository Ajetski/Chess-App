import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import 'jsdom-worker';

import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalOpenButton,
	ModalTitle,
	ModalCloseButton
} from '../components/Modal';
import configureStore from '../store/configureStore';
import { setShowModal } from '../actions/modalActions';

const store = configureStore();

const TestModal = () => (
	<Provider store={store}>
		<Modal id="testModal">
			<ModalHeader>
				Header
				<ModalTitle>
					Title
				</ModalTitle>
			</ModalHeader>
			<ModalBody>
				Body
			</ModalBody>
			<ModalFooter>
				Footer
				<ModalCloseButton>
					Close
				</ModalCloseButton>
			</ModalFooter>
		</Modal>
		<ModalOpenButton>
			Open
		</ModalOpenButton>
	</Provider>
);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestModal />, div);
});

it('modal toggle works', () => {
	render(<TestModal />)
	expect(screen.getByText('Body')).not.toBeVisible();
	screen.getByText('Open').click();
	expect(screen.getByText('Body')).toBeVisible();
	screen.getByText('Close').click();
	expect(screen.getByText('Body')).not.toBeVisible();
});
