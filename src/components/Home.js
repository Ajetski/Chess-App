import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import SelectGame from './SelectGame.js'
import env from '../env/env';
import {
	Modal,
	ModalOpenButton,
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
	ModalCloseButton
} from "./Modal";

export default function Home() {
	const [gameId, setGameId] = useState();
	const history = useHistory();
	const [copyText, setCopyText] = useState('Copy Link');

	function handleNewGame() {
		axios.post(`${env.apiUrl}/game`, {}).then(res => {
			setGameId(res.data.id);
		});
	}

	function hanldeGoToGame() {
		history.push(`/game/${gameId}`);
	}

	function handleCloseModal() {
		setCopyText('Copy Link');
		setGameId(undefined);
	}

	function handleCopyLink() {
		navigator.clipboard.writeText(`${env.siteURL}/game/${gameId}`)
			.then(() => setCopyText('Coppied...'));
	}

	return (
		<>
			<div className="container">
				<div className="row">
					<ModalOpenButton
						modal-id="newGameModal"
						className="btn btn-primary"
						onClick={handleNewGame}>
						New Game
					</ModalOpenButton>
				</div>
				<div className="row mt-4">
					<SelectGame />
				</div>
			</div>

			<Modal id="newGameModal">
				<ModalHeader>
					<ModalTitle>
						{gameId ? 'Game Created' : 'Creating Game...'}
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					{gameId ?
						<div className="container">
							<div className="row my-2">
								Send this URL to a friend: {`${env.siteURL}/game/${gameId}`}
							</div>
							<div className="row my-2 btn-group">
								<button className="btn btn-secondary"
									onClick={handleCopyLink}>
									{copyText}
								</button>
								<ModalCloseButton
									className="btn btn-primary"
									onClick={hanldeGoToGame}>
									Go to game
									</ModalCloseButton>
							</div>
						</div>
						: <p>Generating new game...</p>}
				</ModalBody>
				<ModalFooter>
					<ModalCloseButton
						className="float-right btn btn-danger"
						onClick={handleCloseModal}>
						Close
				</ModalCloseButton>
				</ModalFooter>
			</Modal>
		</>
	);
}
