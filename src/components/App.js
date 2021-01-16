import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GuardedRoute from './GuardedRoute';
import Game from './Game';

export default function App() {
	return (
		<div className="container">
			<div className="row">
				<p>some header</p>
			</div>
			<Router>
				<Switch>
					<Route path="/" exact>
						<Game />
					</Route>
					<Route path="/analysis">
						<Game />
					</Route>
					<Route path="/game/:gameId">
						<Game />
					</Route>
					<GuardedRoute auth={true} path="/allow">
						<p>authenticated</p>
					</GuardedRoute>
					<GuardedRoute auth={false} path="/disallow">
						<p>not authenticated</p>
					</GuardedRoute>
					<Route path="/">
						<p>NOT FOUND</p>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
