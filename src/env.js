const dev = false;
let env;

if (dev) { // for dev
	env = {
		apiUrl: 'ws://localhost:3001',
		siteURL: 'http://localhost:3000'
	};
} else { // for prod
	env = {
		apiUrl: 'ws://ajet-chess-app-server.herokuapp.com',
		siteURL: 'https://ajet-chess-app.herokuapp.com'
	};
}

export default env;
