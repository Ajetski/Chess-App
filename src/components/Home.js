import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import env from '../env';
import { newGame } from '../ws/actions/gameActions';

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
		const ws = new WebSocket(env.apiUrl);
		ws.onopen = () => {
			ws.send(newGame());
		}
		ws.onmessage = ({ data }) => {
			const action = JSON.parse(data);
			if (action.type === 'game/newGame')
				setGameId(action.id);
		};
	}

	function hanldeGoToGame() {
		history.push(`/game/${gameId}`);
	}

	function copyLink() {
		navigator.clipboard.writeText(`${env.siteURL}/game/${gameId}`)
			.then(() => setCopyText('Coppied...'));
	}

	return (
		<>
			<ModalOpenButton
				modal-id="newGameModal"
				className="btn btn-primary"
				onClick={handleNewGame}>
				New Game
			</ModalOpenButton>
			<Modal id="newGameModal">
				<ModalHeader>
					<ModalTitle>
						Game Created
				</ModalTitle>
				</ModalHeader>
				<ModalBody>
					{gameId ? (
						<>
							<p>
								Send this URL to a friend: {`${env.siteURL}/game/${gameId}`}
								<button className="btn btn-primary"
									onClick={copyLink}>
									{copyText}
								</button>
							</p>
							<ModalCloseButton
								className="btn btn-primary"
								onClick={hanldeGoToGame}>
								Go to game
							</ModalCloseButton>
						</>
					)
						: <p>Generating new game...</p>}
				</ModalBody>
				<ModalFooter>
					<ModalCloseButton
						className="float-right btn btn-danger"
						onClick={() => setCopyText('Copy Link')}>
						Close
				</ModalCloseButton>
				</ModalFooter>
			</Modal>
		</>
	);
}
