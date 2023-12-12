import React from 'react';
import './NavBar.css';
import { Navbar } from 'flowbite-react';

const NavBar = ({}) => {
	return (
		<Navbar fluid rounded className="bg-blue-800">
			<Navbar.Brand href="https://www.linkedin.com/in/alexis-miguel-gutierrez-ruiz-542364202/">
				{/* <img
					src="/favicon.svg"
					className="mr-3 h-6 sm:h-9"
					alt="Flowbite React Logo"
				/> */}
				<span className="self-center whitespace-nowrap text-xl font-semibold">
					Alexis Miguel Gutierrez Ruiz
				</span>
			</Navbar.Brand>
		</Navbar>
	);
};

export default NavBar;
