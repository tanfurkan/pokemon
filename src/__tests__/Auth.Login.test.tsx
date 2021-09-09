import React from 'react';
import { render, screen } from '@testing-library/react';

import { LoginPage } from '../Auth';

test('renders login page check sign in texts', () => {
	render(<LoginPage />);
	const signInTexts = screen.getAllByText(/Sign In/i);

	expect(signInTexts.length).toEqual(2);
	expect(signInTexts[0]).toBeInTheDocument();
});

test('renders login page check email field', () => {
	render(<LoginPage />);
	const emailAddressLabel = screen.getByLabelText(/Email Address/i);

	expect(emailAddressLabel).toBeInTheDocument();
});

test('renders login page check password field', () => {
	render(<LoginPage />);
	const emailAddressLabel = screen.getByLabelText(/Password/i);

	expect(emailAddressLabel).toBeInTheDocument();
});