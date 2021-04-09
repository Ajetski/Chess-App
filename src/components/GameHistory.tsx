import React, { FC } from 'react';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { ChessInstance } from 'chess.js';

interface GameHistoryProps { chess: ChessInstance };

const GameHistory: FC<GameHistoryProps> = ({ chess }) => (
	<Card bg="dark" style={{ height: "500px", overflowY: "auto", overflowX: "hidden" }}>
		{chess ?
			<Card.Text className="pt-1 mt-1 mb-2">
				{chess.history().length > 0 && chess.pgn({ newline_char: '\n', max_width: 5 }).split('\n').map(row => (
					<Row key={row} className="row">
						<Col xs={2} style={{ textAlign: 'center' }}>{row.split(' ')[0]}</Col>
						<Col xs={5} >{row.split(' ')[1]}</Col>
						<Col xs={5} >{row.split(' ')[2] || '...'}</Col>
					</Row>
				))}
			</Card.Text> : <p>chess is undefined</p>
		}
	</Card>
);

export default GameHistory;
