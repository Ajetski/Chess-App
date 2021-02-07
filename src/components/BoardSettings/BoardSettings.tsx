/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent as Component, useState, useEffect } from 'react';

import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalOpenButton,
	ModalTitle,
	ModalCloseButton
} from '../Modal';
import './BoardSettings.css'

type BoardThemeProps = {
	name: string,
	id: string,
	handleClick: (arg0: any) => void,
	currentTheme: string
};

const BoardTheme: Component<BoardThemeProps> = (props) => {
	const active = props.currentTheme === props.id;
	return (
		<div className="row my-2 ml-5">
			<ModalCloseButton
				className={`btn btn-${active ? 'primary' : 'secondary'}`}
				disabled={active}
				onClick={props.handleClick}
				data={props.id}>
				{props.name}
			</ModalCloseButton>
		</div>
	);
}

export default function BoardSettings() {
	const [theme, setTheme] = useState(localStorage.getItem('board-theme') || 'blue2');

	const changeTheme = (newTheme: string) => {
		localStorage.setItem('board-theme', newTheme);
		const boards = document.getElementsByClassName('cg-wrap');
		for (let i = 0; i < boards.length; i++) {
			const board = boards.item(i);
			if (board) {
				board.classList.remove(theme);
				board.classList.add(newTheme);
			}
		}
		setTheme(newTheme);
	};

	const handleChangeTheme = (data: string) => {
		changeTheme(data);
	};

	useEffect(() => {
		const localTheme = localStorage.getItem('board-theme');
		changeTheme(localTheme || 'blue2');
	}, []);

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
						handleClick={handleChangeTheme}
						currentTheme={theme}
					/>
					<BoardTheme name="Blue 2"
						id="blue2"
						handleClick={handleChangeTheme}
						currentTheme={theme}
					/>
					<BoardTheme name="Purple Diag"
						id="purple-diag"
						handleClick={handleChangeTheme}
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
