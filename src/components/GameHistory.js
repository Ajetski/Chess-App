/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core'

const GameHistory = ({ chess }) => (
	<Paper style={{ height: "500px" }}>
		{chess ?
			<div className="pt-1 mt-1 mb-2">
				{chess.history().length > 0 && chess.pgn({ newline_char: '\n', max_width: 5 }).split('\n').map(row => (
					<div key={row} className="row">
						<div className="col-2" style={{ textAlign: 'center' }}>{row.split(' ')[0]}</div>
						<div className="col-5">{row.split(' ')[1]}</div>
						<div className="col-5">{row.split(' ')[2] || '...'}</div>
					</div>
				))}
			</div> : <p>chess is undefined</p>
		}
	</Paper>
);

const mapStateToProps = (state) => ({ chess: state.chess.chess });

export default connect(mapStateToProps)(GameHistory);
