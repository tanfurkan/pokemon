import React from 'react';
import { FixedSizeList } from 'react-window';
import { CircularProgress, makeStyles, TextField } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import Alert from '@material-ui/lab/Alert';
import PokemonListRow from './PokemonListRow';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(6),
		padding: theme.spacing(4, 4),
		borderRadius: 8,
	},
}));

export const PokemonList = () => {
	const classes = useStyles();
	const { data, isLoading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=1500');

	const pokemonList = data?.results;

	if (error) {
		return (
			<div className={classes.root}>
				<Alert severity='error'>{error}</Alert>
			</div>
		);
	}

	return (
		<div className={classes.root}>
			<TextField id='searchPokemon' label='Search Pokemon' variant='outlined' />
			{isLoading ? (
				<CircularProgress />
			) : (
				<div>
					<FixedSizeList height={800} itemSize={40} itemCount={data?.count}>
						{({ index, style }) => (
							<PokemonListRow
								index={index}
								style={style}
								pokemon={pokemonList[index]}
							/>
						)}
					</FixedSizeList>
				</div>
			)}
		</div>
	);
};
