import { FC } from 'react';
import { Route, Redirect } from "react-router-dom";

interface GuardedRouteProps {
	auth: boolean,
	children: any
	[key: string]: any
};

const GuardedRoute: FC<GuardedRouteProps> = ({ auth, children, ...rest }) => {
	return (
		<Route {...rest} render={(props) => (
			auth === true
				? children
				: <Redirect to='/' />
		)} />
	);
}

export default GuardedRoute;
