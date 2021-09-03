import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import capitalizeFirstLetter from '../../Utils/capitalizeFirstLetter';

const PokemonListRow = ({ index, pokemon, style }) => {
	return (
		<ListItem
			component={'a'}
			href={`/pokemon/${pokemon.name}`}
			button
			style={style}
			key={index}
		>
			<ListItemText primary={capitalizeFirstLetter(pokemon.name)} />
		</ListItem>
	);
};

export default PokemonListRow;
