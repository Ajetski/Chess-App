import { MatchRouter } from '../testUtils';
import 'jsdom-worker';

import Game from '../components/Game';

it('renders without crashing', () => {
	MatchRouter(<Game />, "/game/:gameId", "/game/1");
});
