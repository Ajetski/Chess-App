import { connect } from 'react-redux';

function GameHistory(props) {
	return (
		<>
			{props.chess ?
				<div className="mt-3 mb-2">
					{props.chess.pgn({ newline_char: '\n', max_width: 5 }).split('\n').map(row => (
						<div key={row}>{row}</div>
					)) || 'No moves have been played...'}
					{props.chess.fen()}
				</div> : <p>chess is undefined</p>
			}

		</>
	);
}

function mapStateToProps(state) {
	return { chess: state.chess };
}

export default connect(mapStateToProps)(GameHistory)