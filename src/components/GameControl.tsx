import { FC } from 'react';
import { connect } from 'react-redux';
import { ChessInstance } from 'chess.js';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import { setChess, setOrientation } from '../actions/chessActions';
import { copyChess } from '../utils';
import { Store } from '../store/types';

interface GameControlProps {
	chess: ChessInstance,
	orientation: 'white' | 'black',
	dispatch: (arg0: any) => void
};

const GameControl: FC<GameControlProps> = ({ chess, orientation, dispatch }) => (
	<ButtonGroup className="mt-3">
		<Button type="button"
			variant="secondary"
			onClick={() => {
				chess.undo();
				const copy = copyChess(chess);
				dispatch(setChess({ chess: copy }));
			}}>
			Takeback
		</Button>
		<Button type="button"
			variant="danger"
			onClick={() => {
				chess.reset();
				const copy = copyChess(chess);
				dispatch(setChess({ chess: copy }));
			}}>
			Reset
		</Button>
		<Button type="button"
			variant="info"
			onClick={() => {
				dispatch(setOrientation({ orientation: orientation === 'white' ? 'black' : 'white' }));
			}}>
			Flip
		</Button>
	</ButtonGroup>
);

const mapStateToProps = (state: Store, ownProps: any) => ({
	...ownProps,
	chess: state.chess.chess,
	orientation: state.chess.orientation
});

export default connect(mapStateToProps)(GameControl);
