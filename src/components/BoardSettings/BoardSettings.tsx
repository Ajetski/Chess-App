/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react';

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

interface ThemeProps {
	name: string,
	id: string,
	handleClick: (arg0: any) => void,
	currentTheme: string
};

const Theme: FC<ThemeProps> = (props) => {
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
	const [boardTheme, setBoardTheme] = useState(localStorage.getItem('board-theme') || 'blue2');
	const [pieceTheme, setPieceTheme] = useState(localStorage.getItem('piece-theme') || 'merida');

	const changeBoardTheme = (newTheme: string) => {
		localStorage.setItem('board-theme', newTheme);
		const boards = document.getElementsByClassName('cg-wrap');
		for (let i = 0; i < boards.length; i++) {
			const board = boards.item(i);
			if (board) {
				board.classList.remove(boardTheme);
				board.classList.add(newTheme);
			}
		}
		setBoardTheme(newTheme);
	};

	const changePieceTheme = (newTheme: string) => {
		localStorage.setItem('piece-theme', newTheme);
		const pieces = document.getElementsByTagName('piece');
		for (let i = 0; i < pieces.length; i++) {
			const piece = pieces.item(i);
			if (piece) {
				piece.classList.remove(pieceTheme);
				piece.classList.add(newTheme);
			}
		}
		setPieceTheme(newTheme);
	};

	useEffect(() => {
		setTimeout(() => {
			changeBoardTheme(localStorage.getItem('board-theme') || 'blue2');
			changePieceTheme(localStorage.getItem('piece-theme') || 'merida');
		});
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
					<p>Select a board theme:</p>
					<Theme name="Blue"
						id="blue"
						handleClick={changeBoardTheme}
						currentTheme={boardTheme}
					/>
					<Theme name="Blue 2"
						id="blue2"
						handleClick={changeBoardTheme}
						currentTheme={boardTheme}
					/>
					<Theme name="Purple Diag"
						id="purple-diag"
						handleClick={changeBoardTheme}
						currentTheme={boardTheme}
					/>
					<p>Select a piece theme:</p>
					<Theme name="Merida"
						id="merida"
						handleClick={changePieceTheme}
						currentTheme={pieceTheme}
					/>
					<Theme name="Horsey"
						id="horsey"
						handleClick={changePieceTheme}
						currentTheme={pieceTheme}
					/>
				</ModalBody>
				<ModalFooter>
					<ModalCloseButton className="btn btn-danger">Close</ModalCloseButton>
				</ModalFooter>
			</Modal>
		</div>
	);
}
