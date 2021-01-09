import { useState } from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../Modal/Modal';
import './BoardSettings.css'

function BoardTheme(props) {
	const active = props.currentTheme === props.id;
	return (
		<li onClick={props.handleClick} data-id={props.id}>
			<button type="button"
				className={`btn btn-${active ? 'primary' : 'secondary'}`}
				data-bs-dismiss="modal"
				disabled={active}>
				{props.name}
			</button>
		</li>
	);
}

export default function BoardSettings() {
	const [theme, setTheme] = useState('blue2')

	const changeTheme = (e) => {
		const boards = document.getElementsByClassName('cg-wrap');
		const newTheme = e.currentTarget.dataset.id;
		for (let i = 0; i < boards.length; i++) {
			const board = boards.item(i);
			console.log(board.classList);
			board.classList.remove(theme);
			board.classList.add(newTheme);
		}
		setTheme(() => newTheme);
	}

	return (
		<div className='settingsBox m-3'>
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#settingsModal">
				Settings
			</button>
			<Modal id="settingsModal">
				<ModalHeader>
					<ModalTitle>Board Settings</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<p>Select a board:</p>
					<ul>
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
					</ul>
				</ModalBody>
				<ModalFooter>
					<button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
