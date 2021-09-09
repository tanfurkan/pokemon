import React from 'react';
import { render, screen } from '@testing-library/react';

import { PokemonHeader } from '../common/Header';

test('renders header component', () => {
	render(<PokemonHeader />);
	const pokemonAppText = screen.getByText(/Pokemon App/i);
	expect(pokemonAppText).toBeInTheDocument();
});