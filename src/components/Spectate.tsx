/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent as Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChessInstance } from 'chess.js';

import env from '../env/env';
import { pgnToChess } from '../utils';
import { connectToGame, stayConnected } from '../ws/actions/gameActions';
import { Store } from '../store/types';
import { setOrientation, setChess } from '../actions/chessActions';
import Board from './Board';
import BoardSettings from './BoardSettings';
import Evaluation from './Evaluation';
import GameControl from './GameControl';
import GameHistory from './GameHistory';

type SpecateProps = {
    dispatch: (arg0: any) => void,
    chess: ChessInstance
};

const Spectate: Component<SpecateProps> = ({ dispatch, chess }) => {
    const { gameId: gameIdStr } = useParams<{ gameId: string }>();
    const gameId = parseInt(gameIdStr);

    const [ws] = useState(new WebSocket(env.wsUrl));

    useEffect(() => {
        if (gameId) {
            ws.onopen = async () => {
                console.log('connected to game', gameId);
                ws.send(connectToGame({
                    id: gameId,
                    isPlayer: false
                }));
                while (ws.readyState === 1) {
                    ws.send(stayConnected());
                    await new Promise<void>(resolve =>
                        setTimeout(() => resolve(), 15000));
                }
            }
            ws.onmessage = ({ data }) => {
                const action = JSON.parse(data);
                if (action.type === 'game/connect') {
                    dispatch(setOrientation({ orientation: action.orientation }));
                    dispatch(setChess({ chess: pgnToChess(action.pgn) }));
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

const mapStateToProps = (state: Store) => ({ chess: state.chess.chess });

export default connect(mapStateToProps)(Spectate);
