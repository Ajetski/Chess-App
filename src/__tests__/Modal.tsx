import React from 'react';
import ReactDOM from 'react-dom';
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalOpenButton,
	ModalTitle,
	ModalCloseButton
} from '../components/Modal';

const TestModal = () => (
	<>
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
		<ModalOpenButton modal-id="testModal">
			Open
		</ModalOpenButton>
	</>
);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestModal />, div);
});


