import { FC } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Container from 'react-bootstrap/Container'

import GuardedRoute from '../GuardedRoute';
import Home from '../Home';
import Game from '../Game';
import Analysis from '../Analysis';
import Spectate from '../Spectate';
import Navbar from '../Navbar';

import './App.scss'
import Contact from '../Contact';

const App: FC = () => (
	<Container>
		<Router>
			<div className="header mb-2">
				<h3 className="my-auto mr-3">Chess App</h3>
				<Navbar />
			</div>
			<div className="body">
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/analysis">
						<Analysis />
					</Route>
					<Route path="/contact">
						<Contact />
					</Route>
					<Route path="/game/watch/:gameId">
						<Spectate />
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
	</Container>
);

export default App;
