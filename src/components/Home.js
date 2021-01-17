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

	console.log(env, env.apiUrl);

	function handleNewGame() {
		const ws = new WebSocket(env.apiUrl);
		ws.onopen = (event) => {
			console.log(event);
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
							<p>Send this URL to a friend: {`${env.siteURL}/game/${gameId}`}</p>
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
						className="float-right btn btn-danger">
						Close
				</ModalCloseButton>
				</ModalFooter>
			</Modal>
		</>
	);
}
