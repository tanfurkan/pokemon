import React, { useEffect, useState } from 'react';

import {
	CircularProgress,
	Container,
	Grid,
	IconButton,
	List,
	makeStyles,
	TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';

import PokemonListRow from './PokemonListRow';
import PokemonListCard from './PokemonCard';
import useFetch from '../../hooks/useFetch';
import { PokemonViewMode } from '../../Utils/Enum';
import { PokemonHeader } from '../../common/Header';
import { LOCAL_STORAGE_VIEW_MODE } from '../../Utils/constants';
import { IPokemon, IPokemonList } from '../../types';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(6),
		padding: theme.spacing(4, 4),
		borderRadius: theme.spacing(1),
	},
	errorBar: {
		width: '60%',
	},
	pokemonListContainer: {
		marginTop: theme.spacing(1),
		position: 'relative',
		overflow: 'auto',
		maxHeight: '70vh',
	},
	list: {
		flexGrow: 1,
		width: '100%',
	},
}));

export const PokemonList: React.FC<unknown> = () => {
	const classes = useStyles();

	const { data, isLoading, error } = useFetch<IPokemonList | null>(
		'https://pokeapi.co/api/v2/pokemon?limit=500',
	);
	const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
	const [searchText, setSearchText] = useState<string>('');
	const [viewMode, setViewMode] = useState<number>(() =>
		parseInt(sessionStorage.getItem(LOCAL_STORAGE_VIEW_MODE) || `${PokemonViewMode.List}`),
	);

	useEffect(() => {
		if (searchText.length) {
			const filteredPokemonList = data?.results.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(searchText.toLowerCase()),
			);
			setPokemonList(filteredPokemonList || []);
		} else {
			setPokemonList(data?.results || []);
		}
	}, [searchText, data]);

	const handleViewModeChange = (viewMode: number) => {
		sessionStorage.setItem(LOCAL_STORAGE_VIEW_MODE, String(viewMode));
		setViewMode(viewMode);
	};

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
		<>
			<PokemonHeader />
			<Container maxWidth='lg'>
				<Grid container spacing={4} className={classes.root}>
					{isLoading ? (
						<CircularProgress />
					) : (
						<>
							<Grid
								container
								item
								xs={12}
								justifyContent={'space-between'}
								alignItems={'center'}
							>
								<Grid item xs={2} />
								<Grid item xs={6} lg={5}>
									<TextField
										id='searchPokemon'
										label='Search Pokemon'
										variant='outlined'
										fullWidth
										value={searchText}
										onChange={(event) => setSearchText(event.target.value)}
									/>
								</Grid>
								<Grid
									container
									item
									xs={2}
									justifyContent='flex-end'
									alignItems='center'
								>
									<IconButton
										onClick={() => handleViewModeChange(PokemonViewMode.List)}
										color={
											viewMode === PokemonViewMode.List
												? 'primary'
												: 'default'
										}
									>
										<ListIcon style={{ fontSize: 32 }} />
									</IconButton>
									<IconButton
										onClick={() => handleViewModeChange(PokemonViewMode.Grid)}
										color={
											viewMode === PokemonViewMode.Grid
												? 'primary'
												: 'default'
										}
									>
										<AppsIcon style={{ fontSize: 32 }} />
									</IconButton>
								</Grid>
							</Grid>

							{viewMode === PokemonViewMode.List ? (
								<Grid
									id='pokemonListView'
									container
									item
									xs={12}
									className={classes.pokemonListContainer}
								>
									<List className={classes.list}>
										{pokemonList.map((pokemon, index) => (
											<PokemonListRow key={index} pokemon={pokemon} />
										))}
									</List>
								</Grid>
							) : (
								<Grid
									id='pokemonGridView'
									container
									spacing={2}
									item
									xs={12}
									className={classes.pokemonListContainer}
								>
									{pokemonList.map((pokemon, index) => (
										<PokemonListCard key={index} pokemon={pokemon} />
									))}
								</Grid>
							)}
						</>
					)}
				</Grid>
			</Container>
		</>
	);
};
