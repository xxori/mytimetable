import { Navbar, NavbarBrand } from '@nextui-org/react';

export const Header = () => {
	return (
		<Navbar isBordered maxWidth="xl">
			<NavbarBrand>
				<h1 className="font-bold text-inherit">My Timetable</h1>
			</NavbarBrand>
		</Navbar>
	);
};
