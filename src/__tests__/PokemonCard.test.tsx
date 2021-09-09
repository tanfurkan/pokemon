import React from 'react';
import { render, screen } from '@testing-library/react';

import PokemonCard from '../Pokemon/PokemonList/PokemonCard';

test('renders pokemonCard without pokemon', () => {
	render(<PokemonCard pokemon={null}/>);
	const fakePokemonName = screen.queryByText(/TestingPokemonName/i);
	expect(fakePokemonName).not.toBeInTheDocument();
});

test('renders pokemonCard with pokemon', () => {
	render(<PokemonCard pokemon={{name:'TestingPokemonName'}}/>);

	const fakePokemonName = screen.queryByText(/TestingPokemonName/i);
	expect(fakePokemonName).toBeInTheDocument();
});

test('renders pokemonCard with pokemon test fake positive', () => {
	render(<PokemonCard pokemon={{name:'fakeName11'}}/>);

	const fakePokemonName = screen.queryByText(/TestingPokemonName/i);
	expect(fakePokemonName).not.toBeInTheDocument();
});