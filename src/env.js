const dev = false;
let env;

if (dev) { // for dev
	env = {
		wsUrl: 'ws://localhost:3001',
		apiUrl: 'http://localhost:3001',
		siteURL: 'http://localhost:3000'
	};
} else { // for prod
	env = {
		wsUrl: 'wss://ajet-chess-app-server.herokuapp.com',
		apiUrl: 'https://ajet-chess-app-server.herokuapp.com',
		siteURL: 'https://ajet-chess-app.herokuapp.com'
	};
}

export default env;
