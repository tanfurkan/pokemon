import React from 'react';
import { render, screen } from '@testing-library/react';

import { HeaderUser } from '../common/HeaderUser';
import { LOCAL_STORAGE_USER } from '../Utils/constants';
import AuthProvider from '../Auth/AuthContext';

test('renders user component in header without user', () => {
	localStorage.removeItem(LOCAL_STORAGE_USER);
	render(
		<AuthProvider>
			<HeaderUser />
		</AuthProvider>,
	);
	const signOutText = screen.queryByText(/Sign Out/i);
	expect(signOutText).not.toBeInTheDocument();
});

test('renders user component in header with user', () => {
	localStorage.setItem(
		LOCAL_STORAGE_USER,
		JSON.stringify({ id: 1, name: 'John Smith', email: 'test@startuphero.es' }),
	);
	render(
		<AuthProvider>
			<HeaderUser />
		</AuthProvider>,
	);
	const signOutText = screen.getByText(/Sign Out/i);
	localStorage.removeItem(LOCAL_STORAGE_USER);
	expect(signOutText).toBeInTheDocument();
});
