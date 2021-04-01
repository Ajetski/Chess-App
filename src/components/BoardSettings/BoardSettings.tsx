/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './BoardSettings.css'

interface ThemeProps {
	name: string,
	id: string,
	handleClick: (arg0: any) => void,
	currentTheme: string
};

const Theme: FC<ThemeProps> = (props) => {
	console.log(props.id)
	const active = props.currentTheme === props.id;
	return (
		<Button variant={active? 'primary' : 'secondary'}
		disabled={active}
		onClick={() => props.handleClick(props.id)}
		>
		{props.name}</Button>
	);
}

export default function BoardSettings() {
	const [boardTheme, setBoardTheme] = useState(localStorage.getItem('board-theme') || 'blue2');
	const [pieceTheme, setPieceTheme] = useState(localStorage.getItem('piece-theme') || 'merida');
	const [showModal, setShowModal] = useState(false);

	const handleClose = () => setShowModal(false);
 	const handleShow = () => setShowModal(true);

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
			<Button variant="primary" onClick={handleShow} className="mt-2">
				Settings
			</Button>
			<Modal show={showModal} onHide={handleClose} id="settingsModal">
				<Modal.Header closeButton>
					<Modal.Title>Board Settings</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
