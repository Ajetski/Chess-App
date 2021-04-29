import { FC } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import { UpdateChess } from '../hooks/useChess';
import { UpdateOnlineChess } from '../hooks/useOnlineChess';

interface GameControlProps {
	type: 'Game' | 'Analysis',
	updateChess: UpdateChess | UpdateOnlineChess
};

const GameControl: FC<GameControlProps> = ({ type, updateChess }) => (
	<ButtonGroup className="mt-3">
		{type === 'Analysis' &&
			<>
				<Button type="button"
					variant="secondary"
					onClick={(updateChess as UpdateChess).undo}>
					Takeback
				</Button>
				<Button type="button"
					variant="danger"
					onClick={(updateChess as UpdateChess).reset}>
					Reset
				</Button>
			</>
		}
		<Button type="button"
			variant="info"
			onClick={updateChess.flip}>
			Flip
		</Button>
	</ButtonGroup>
);

export default GameControl;
