import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { PokemonList } from '../Pokemon';
import { LOCAL_STORAGE_VIEW_MODE } from '../Utils/constants';
import { PokemonViewMode } from '../Utils/Enum';

test('renders pokemon list while loading', async () => {
	render(<PokemonList/>);

	const circularProgress  = screen.getByRole('progressbar');
	expect(circularProgress).toBeInTheDocument();
});

test('renders pokemon list with ListView mode', async () => {
	sessionStorage.setItem(LOCAL_STORAGE_VIEW_MODE, `${PokemonViewMode.List}`);
	render(<PokemonList/>);

	await waitFor(() => {
		const listContainer = document.getElementById('pokemonListView');
		expect(listContainer).not.toBeNull();
	});
});

test('renders pokemon list with GridView mode', async () => {
	sessionStorage.setItem(LOCAL_STORAGE_VIEW_MODE, `${PokemonViewMode.Grid}`);
	render(<PokemonList/>);

	await waitFor(() => {
		const listContainer = document.getElementById('pokemonGridView');
		expect(listContainer).not.toBeNull();
	});
});

