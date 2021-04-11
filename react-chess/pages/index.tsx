import { FC, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import SelectGame from '../components/SelectGame'
import env from '../env/env';


const Home: FC = () => {
	const [gameId, setGameId] = useState('');
	const [color, setColor] = useState('');
	// const history = useHistory();
	const [copyText, setCopyText] = useState('Copy Link');
	const [showModal, setShowModal] = useState(false);


	// const handleGoToGame = ()=> {
	// 	history.push(`/game/${gameId}`);
	// };

	
	const handleShow = () => setShowModal(true);
	const handleClose = ()=> {
		setShowModal(false);
		setCopyText('Copy Link');
		setColor('');
		setGameId('');
	};

	const handleCopyLink = ()=> {
		navigator.clipboard.writeText(`${env.siteURL}/game/${gameId}`)
			.then(() => setCopyText('Copied...'));
	};

	useEffect(() => {
		if (color) {
			axios.post(`${env.apiUrl}/game`, {
				color, userId: localStorage.getItem('userId')
			}).then(res => {
				setGameId(res.data.id);
			});
		}
	}, [color]);

	return (
		<>
			<Row>
				<Button variant="primary" onClick={handleShow}>
					New Game
				</Button>
			</Row>
			<Row className="mt-4">
				<SelectGame />
			</Row>

			<Modal show={showModal} onHide={handleClose} id="newGameModal">
				<Modal.Header>
					<Modal.Title>
						{!color ?
							'Choose a color'
							: gameId ?
								'Game Created'
								: 'Creating Game...'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{!color ?
						<ButtonGroup>
							<Button variant="primary"
								onClick={() => setColor('white')}>
								White
							</Button>
							<Button variant="secondary"
								onClick={() => setColor('black')}>
								Black
							</Button>
							<Button variant="primary"
								onClick={() => setColor('random')}>
								Random
							</Button>
						</ButtonGroup>
						: gameId ?
							<div className="ml-2">
								<Row className="my-2">
									Send this URL to a friend: {`${env.siteURL}/game/${gameId}`}
								</Row>
								<Row className="my-2">
									<ButtonGroup>
										<Button variant="primary"
											onClick={handleCopyLink}>
											{copyText}
										</Button>
										<Button variant="primary">
											{/* onClick={handleGoToGame}> */}
											Go to game
										</Button>
									</ButtonGroup>
								</Row>
							</div>
							: <p>Generating new game...</p>
					}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Home;
