import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

import capitalizeFirstLetter from '../../Utils/capitalizeFirstLetter';

const PokemonListRow = ({ pokemon = null, style }) => {
	if (!pokemon) {
		return null;
	}

	return (
		<ListItem component={'a'} href={`/pokemon/${pokemon.name}`} button>
			<ListItemAvatar>
				<Avatar
					alt={pokemon.name}
					src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
				/>
			</ListItemAvatar>
			<ListItemText primary={capitalizeFirstLetter(pokemon.name)} />
		</ListItem>
	);
};

export default PokemonListRow;
