import { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalOpenButton, ModalTitle, ModalCloseButton } from '../Modal/Modal';
import './BoardSettings.css'

function BoardTheme(props) {
	const active = props.currentTheme === props.id;
	return (
		<div className="row my-2 ml-5">
			<ModalCloseButton
				className={`btn btn-${active ? 'primary' : 'secondary'}`}
				disabled={active}
				onClick={props.handleClick}
				data-id={props.id}>
				{props.name}
			</ModalCloseButton>
		</div>
	);
}

export default function BoardSettings() {
	const [theme, setTheme] = useState('blue2');

	const changeTheme = (e) => {
		const boards = document.getElementsByClassName('cg-wrap');
		const newTheme = e.currentTarget.dataset.id;
		for (let i = 0; i < boards.length; i++) {
			const board = boards.item(i);
			board.classList.remove(theme);
			board.classList.add(newTheme);
		}
		setTheme(() => newTheme);
	}

	return (
		<div className="settingsBox mt-4">
			<ModalOpenButton
				className="btn btn-primary"
				modal-id="settingsModal">
				Settings
			</ModalOpenButton>
			<Modal id="settingsModal">
				<ModalHeader>
					<ModalTitle>Board Settings</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<p>Select a board:</p>
					<BoardTheme name="Blue"
						id="blue"
						handleClick={changeTheme}
						currentTheme={theme}
					/>
					<BoardTheme name="Blue 2"
						id="blue2"
						handleClick={changeTheme}
						currentTheme={theme}
					/>
					<BoardTheme name="Purple Diag"
						id="purple-diag"
						handleClick={changeTheme}
						currentTheme={theme}
					/>
				</ModalBody>
				<ModalFooter>
					<ModalCloseButton className="btn btn-danger">Close</ModalCloseButton>
				</ModalFooter>
			</Modal>
		</div>
	);
}
