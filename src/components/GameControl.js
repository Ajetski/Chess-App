import { connect } from 'react-redux';

import { setChess } from '../actions/chessActions';
import { copyChess } from '../utils';

const GameControl = ({ chess, dispatch }) => (
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
	</div>
);

const mapStateToProps = (state, ownProps) => ({ ...ownProps, chess: state.chess.chess });

export default connect(mapStateToProps)(GameControl);
