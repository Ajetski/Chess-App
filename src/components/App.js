import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import GuardedRoute from './GuardedRoute';
import Home from './Home';
import Game from './Game';
import Analysis from './Analysis';
import Navbar from './Navbar';

const App = () => (
	<div className="container">
		<Router>
			<div className="row mb-2">
				<h3 className="my-auto mr-3">Chess App</h3>
				<Navbar />
			</div>
			<div className="row">
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/analysis">
						<Analysis />
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
			</div>
		</Router>
	</div>
);

export default App;
