import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => (
	<ul className="nav justify-content-center">
		<li className="nav-item">
			<Link className="nav-link" to="/">
				<button className="btn btn-primary">
					Home
				</button>
			</Link>
		</li>
		<li className="nav-item">
			<Link className="nav-link" to="/analysis">
				<button className="btn btn-primary">
					Analysis
				</button>
			</Link>
		</li>
	</ul>
);

export default Navbar;
