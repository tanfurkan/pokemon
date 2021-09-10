import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App';
import { LOCAL_STORAGE_USER } from '../Utils/constants';

test('renders app page without user', () => {
	render(<App />);
	const signInTexts = screen.getAllByText(/Sign In/i);

	expect(signInTexts.length).toEqual(2);
	expect(signInTexts[0]).toBeInTheDocument();
});

test('renders app page with user', () => {
	localStorage.setItem(
		LOCAL_STORAGE_USER,
		JSON.stringify({ id: 1, name: 'John Smith', email: 'test@startuphero.es' }),
	);
	render(<App />);
	const searchPokemonText = screen.getByText(/Pokemon App/i);
	localStorage.removeItem(LOCAL_STORAGE_USER);
	expect(searchPokemonText).toBeInTheDocument();
});
