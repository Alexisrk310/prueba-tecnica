import { createBrowserRouter } from 'react-router-dom';
import LayoutPublicPage from '../layout/LayoutPublicPage';
import { NoFoundPage } from '../components';
import { HomePage } from '../pages';

export const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <LayoutPublicPage />,
		errorElement: <NoFoundPage />,
		children: [
			{
				errorElement: <NoFoundPage />,

				children: [
					{
						index: true,
						element: <HomePage />,
					},
				],
			},
		],
	},
]);
