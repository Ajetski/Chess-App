import { FC } from 'react';
import { Nav, Navbar as NavBar, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

const Navbar: FC = () => (
	<NavBar>
		<Nav className="justify-content-center">
			
				<LinkContainer to="/">
					<Nav.Link><Button variant="primary">Home</Button></Nav.Link>
				</LinkContainer>
			
			
			<LinkContainer to="/analysis">
				<Nav.Link><Button variant="primary">Analysis</Button></Nav.Link>
			</LinkContainer>
			
			
			<LinkContainer to="/contact">
				<Nav.Link><Button variant="primary">Contact Us
			</Button></Nav.Link>
			</LinkContainer>
		</Nav>
	</NavBar>
);

export default Navbar;
