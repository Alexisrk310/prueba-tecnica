import React from 'react';
import { AppRouter } from './router/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

export const App = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={AppRouter} />
		</Provider>
	);
};
