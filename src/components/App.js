import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './Game';

export default function App() {
	return (
		<div className="container">
			<div className="row">y
				<p>some header</p>
			</div>
			<Router>
				<Switch>
					<Route path="/" exact>
						<Game />
					</Route>
					<Route path="/">
						<p>NOT FOUND</p>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
