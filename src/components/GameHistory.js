import { connect } from 'react-redux';
import setChess from '../actions/chessActions';
import { copyChess } from '../utils';

function GameHistory({ chess, dispatch }) {
	return (
		<>
			{chess ?
				<div className="mt-3 mb-2">
					{chess.pgn({ newline_char: '\n', max_width: 5 }).split('\n').map(row => (
						<div key={row}>{row}</div>
					)) || 'No moves have been played...'}
					{chess.fen()}
				</div> : <p>chess is undefined</p>
			}
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
		</>
	);
}

function mapStateToProps(state) {
	return { chess: state.chess };
}

export default connect(mapStateToProps)(GameHistory)
