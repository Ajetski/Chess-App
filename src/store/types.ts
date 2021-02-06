import { ChessInstance } from 'chess.js';

export interface ChessStore {
	chess: ChessInstance,
	orientation: 'black' | 'white'
};

export interface EngineStore {
	depth: number,
	maxDepth: number,
	evaluation: string,
	bestmove: string,
	line: string[],
	engine: Worker
};

export interface Store {
	chess: ChessStore,
	engine: EngineStore
};
