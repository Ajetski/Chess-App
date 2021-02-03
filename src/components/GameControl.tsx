import React from 'react';
import { connect } from 'react-redux';
import { ChessInstance } from 'chess.js';

import { setChess, setOrientation } from '../actions/chessActions';
import { copyChess } from '../utils';
import { Store } from '../store/model';

const GameControl = ({ chess, orientation, dispatch }: {
	chess: ChessInstance,
	orientation: 'white' | 'black',
	dispatch: (arg0: any) => void
}) => (
	<div className="btn-group mt-3">
		<button type="button"
			className="btn btn-secondary "
			onClick={() => {
				chess.undo();
				const copy = copyChess(chess);
				dispatch(setChess({ chess: copy }));
			}}>
			Takeback
		</button>
		<button type="button"
			className="btn btn-danger"
			onClick={() => {
				chess.reset();
				const copy = copyChess(chess);
				dispatch(setChess({ chess: copy }));
			}}>
			Reset
		</button>
		<button type="button"
			className="btn btn-info"
			onClick={() => {
				console.log(orientation);
				dispatch(setOrientation({ orientation: orientation === 'white' ? 'black' : 'white' }));
			}}>
			Flip
		</button>
	</div>
);

const mapStateToProps = (state: Store, ownProps: any) => ({
	...ownProps,
	chess: state.chess.chess,
	orientation: state.chess.orientation
});

export default connect(mapStateToProps)(GameControl);
