import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function GuardedRoute({ auth, children, ...rest }: {
	auth: boolean,
	children: any
	[key: string]: any
}) {
	return (
		<Route {...rest} render={(props) => (
			auth === true
				? children
				: <Redirect to='/' />
		)} />
	);
}
