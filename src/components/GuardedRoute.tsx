import { FunctionComponent as Component } from 'react';
import { Route, Redirect } from "react-router-dom";

type GuardedRouteProps = {
	auth: boolean,
	children: any
	[key: string]: any
};

const GuardedRoute: Component<GuardedRouteProps> = ({ auth, children, ...rest }) => {
	return (
		<Route {...rest} render={(props) => (
			auth === true
				? children
				: <Redirect to='/' />
		)} />
	);
}

export default GuardedRoute;
