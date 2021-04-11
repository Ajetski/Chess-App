import { MatchRouter } from '../testUtils';
import 'jsdom-worker';

import Spectate from '../components/Spectate';
it('renders without crashing', () => {
    MatchRouter(<Spectate />, "/game/watch/:gameId", "/game/watch/1");
});
