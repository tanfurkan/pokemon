import React from 'react';
import { render, screen } from '@testing-library/react';

import PokemonListRow from '../Pokemon/PokemonList/PokemonListRow';

test('renders pokemonListRow without pokemon', () => {
	render(<PokemonListRow pokemon={null} />);
	const fakePokemonName = screen.queryByText(/TestingPokemonName/i);
	expect(fakePokemonName).not.toBeInTheDocument();
});

test('renders pokemonListRow with pokemon', () => {
	render(<PokemonListRow pokemon={{ name: 'TestingPokemonName' }} />);

	const fakePokemonName = screen.queryByText(/TestingPokemonName/i);
	expect(fakePokemonName).toBeInTheDocument();
});

test('renders pokemonListRow with pokemon test fake positive', () => {
	render(<PokemonListRow pokemon={{ name: 'fakeName11' }} />);

	const fakePokemonName = screen.queryByText(/TestingPokemonName/i);
	expect(fakePokemonName).not.toBeInTheDocument();
});
