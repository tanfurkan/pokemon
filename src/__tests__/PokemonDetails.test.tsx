import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { getByText, render, screen, waitFor } from '@testing-library/react';

import { PokemonDetails } from '../Pokemon';

test('renders pokemon detail page while loading', async () => {
	render(
		<MemoryRouter initialEntries={['/pokemon/bulbasaur']} initialIndex={0}>
			<Route path="/pokemon/:pokemonName" component={PokemonDetails} />
		</MemoryRouter>
	);

	const circularProgress  = screen.getByRole('progressbar');
	expect(circularProgress).toBeInTheDocument();
});

test('renders pokemon detail page with valid pokemon bulbasaur', async () => {
	render(
		<MemoryRouter initialEntries={['/pokemon/bulbasaur']} initialIndex={0}>
			<Route path="/pokemon/:pokemonName" component={PokemonDetails} />
		</MemoryRouter>
	);

	await waitFor(() => {
		expect(getByText(document.body,'BULBASAUR')).toBeInTheDocument();
		expect(getByText(document.body,'Abilities')).toBeInTheDocument();
		expect(getByText(document.body,'Types')).toBeInTheDocument();
		expect(getByText(document.body,'Stats')).toBeInTheDocument();
	});
});

test('renders pokemon detail page with invalid pokemon test123', async () => {
	render(
		<MemoryRouter initialEntries={['/pokemon/test123']} initialIndex={0}>
			<Route path="/pokemon/:pokemonName" component={PokemonDetails} />
		</MemoryRouter>
	);

	await waitFor(() => {
		const errorText = screen.queryByText(/Error during fetch!/i);
		expect(errorText).toBeInTheDocument();
	});
});

