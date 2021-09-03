import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { CircularProgress, Grid, makeStyles, TextField } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import Alert from '@material-ui/lab/Alert';
import PokemonListRow from './PokemonListRow';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(6),
		padding: theme.spacing(4, 4),
		borderRadius: 8,
	},
	errorBar: {
		width: '60%',
	},
	searchBar: {
		width: '50%',
	},
}));

export const PokemonList = () => {
	const classes = useStyles();

	const { data, isLoading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=1500');
	const [pokemonList, setPokemonList] = useState([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		if (searchText.length) {
			let filteredPokemonList = data?.results.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(searchText.toLowerCase()),
			);
			setPokemonList(filteredPokemonList || []);
		} else {
			setPokemonList(data?.results || []);
		}
	}, [searchText, data]);

	if (error) {
		return (
			<div className={classes.root}>
				<Alert className={classes.errorBar} severity='error'>
					{error}
				</Alert>
			</div>
		);
	}

	return (
		<Grid container spacing={4} className={classes.root}>
			{isLoading ? (
				<CircularProgress />
			) : (
				<>
					<Grid container item xs={12} justifyContent={'center'} alignItems={'center'}>
						<TextField
							id='searchPokemon'
							label='Search Pokemon'
							variant='outlined'
							className={classes.searchBar}
							value={searchText}
							onChange={(event) => setSearchText(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<FixedSizeList height={800} itemSize={40} itemCount={pokemonList.length}>
							{({ index, style }) => (
								<PokemonListRow
									index={index}
									style={style}
									pokemon={pokemonList[index]}
								/>
							)}
						</FixedSizeList>
					</Grid>
				</>
			)}
		</Grid>
	);
};
