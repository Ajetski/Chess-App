/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react';
import { Chessground } from 'chessground';
import { Api } from 'chessground/api';
import { ChessInstance, ShortMove } from 'chess.js';

import { toDests, toColor } from '../../utils';
import { Square } from 'chess.js';
import { Config } from 'chessground/config';
import { Key, SetPremoveMetadata } from 'chessground/types';
import { UpdateChess } from '../../hooks/useChess';

import { UpdateOnlineChess } from '../../hooks/useOnlineChess';

interface BoardProps {
	chess: ChessInstance,
	updateChess: UpdateChess | UpdateOnlineChess,
	orientation: 'white' | 'black',
	width?: string,
	height?: string,
	spectateMode?: boolean,
	analysisMode?: boolean,
};


const Board: FC<BoardProps> = ({ chess, updateChess, orientation, width, height, spectateMode, analysisMode }) => {
	const [cg, setCg] = useState<Api>();
	const [premove, setPremove] = useState<ShortMove>();
	const [boardRef, setBoardRef] = useState<HTMLDivElement>();
	

	const config: Config = {
		orientation: orientation,
		turnColor: toColor(chess),
		lastMove: chess.history({ verbose: true }).slice(-1).map(move => [move.from, move.to])[0],
		viewOnly: spectateMode,
		movable: {
			color: analysisMode ? toColor(chess) : orientation,
			free: false,
			dests: toDests(chess),
			events: {
				after: (orig: Key, dest: Key, metadata: SetPremoveMetadata | undefined) => {
					updateChess.move({ from: orig as Square, to: dest as Square });
				}
			}
		},
		premovable: {
			events: {
				set: (orig: Key, dest: Key, metadata: SetPremoveMetadata | undefined) => {
					setPremove({ from: orig as Square, to: dest as Square });
				},
				unset: () => {
					setPremove(undefined);
				}
			}
		},
		draggable: {
			showGhost: true
		},
		fen: chess.fen()
	};

	useEffect(() => {
		if (boardRef) {
			const api = Chessground(boardRef, config);
			setCg(api);
			const board = document.getElementsByClassName('cg-wrap').item(0);
			if (board)
				board.classList.add(localStorage.getItem('board-theme') || 'blue2');
		}
	}, [boardRef]);

	useEffect(() => {
		if (cg) {
			cg.set(config);
		}

		if (premove && cg) {
			updateChess.move(premove);
			cg.playPremove();
			setPremove(undefined);
		}
	}, [chess]);

	useEffect(() => {
		if (cg) {
			cg.set(config);
		}
	}, [orientation]);

	return (
		<div ref={(el) => {
			if (el) setBoardRef(el);
		}}
			style={{
				width: width,
				height: height
			}}>
		</div>
	);
}

Board.defaultProps = {
	width: '720px',
	height: '720px',
	spectateMode: false,
	analysisMode: false
};

export default Board;
