import { FC } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import { UpdateChess } from '../hooks/useChess';

interface GameControlProps {
	updateChess: UpdateChess
};

const GameControl: FC<GameControlProps> = ({ updateChess }) => (
	<ButtonGroup className="mt-3">
		<Button type="button"
			variant="secondary"
			onClick={updateChess.undo}>
			Takeback
		</Button>
		<Button type="button"
			variant="danger"
			onClick={updateChess.reset}>
			Reset
		</Button>
		<Button type="button"
			variant="info"
			onClick={updateChess.flip}>
			Flip
		</Button>
	</ButtonGroup>
);

export default GameControl;
