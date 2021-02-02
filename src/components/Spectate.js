/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import env from '../env/env';
import { pgnToChess } from '../utils';
import { connectToGame, stayConnected } from '../ws/actions/gameActions';
import { setOrientation, setChess } from '../actions/chessActions';
import Board from './Board';
import BoardSettings from './BoardSettings';
import Evaluation from './Evaluation';
import GameControl from './GameControl';
import GameHistory from './GameHistory';

function Spectate({ dispatch, chess }) {
    const { gameId } = useParams();

    console.log(gameId);

    const [ws] = useState(new WebSocket(env.wsUrl));

    useEffect(() => {
        if (gameId) {
            ws.onopen = () => {
                console.log('connected to game', gameId);
                ws.send(connectToGame({
                    id: gameId,
                    isPlayer: false
                }));
                const sendPing = () => {
                    if (ws.readyState === 1) {
                        // eslint-disable-next-line no-unused-vars
                        setTimeout(sendPing, 30000);
                        ws.send(stayConnected());
                    }
                }
            }
            ws.onmessage = ({ data }) => {
                const action = JSON.parse(data);
                if (action.type === 'game/connect') {
                    dispatch(setOrientation({ orientation: action.orientation }));
                    dispatch(setChess({ chess: pgnToChess(action.pgn) }));
                    console.log(action.pgn);
                }
                else if (action.type === 'game/move') {
                    dispatch(setChess({ chess: pgnToChess(action.pgn) }));
                }
            };
        }
        return () => {
            ws.close();
        }
    }, []);

    return (
        <>
            <div className="col-xl-8 col-12">
                <div className="mx-auto" style={{ width: 'fit-content' }}>
                    <Board spectateMode={true} />
                    <BoardSettings />
                </div>
            </div>
            <div className="col-xl-4 mt-3">
                <Evaluation />
                <GameHistory />
                <GameControl />
            </div>
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({ ...ownProps, chess: state.chess.chess });

export default connect(mapStateToProps)(Spectate);
