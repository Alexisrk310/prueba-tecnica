import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

const LayoutPublicPage = () => {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};
export default LayoutPublicPage;
