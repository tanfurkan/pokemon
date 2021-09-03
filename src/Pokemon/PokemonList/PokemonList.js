import React from 'react';
import { FixedSizeList } from 'react-window';
import { CircularProgress, makeStyles } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import Alert from '@material-ui/lab/Alert';
import PokemonListRow from './PokemonListRow';
// import PokemonListRow from './PokemonListRow';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: 400,
		maxWidth: 300,
		backgroundColor: theme.palette.background.paper,
	},
}));

export const PokemonList = () => {
	const classes = useStyles();
	const { data, isLoading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=1500');
	console.log(data, isLoading, error);

	if (error) {
		return (
			<div className={classes.root}>
				<Alert severity='error'>{error}</Alert>
			</div>
		);
	}

	return (
		<div className={classes.root}>
			{isLoading ? (
				<CircularProgress />
			) : (
				<FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
					{({ index, style }) => <PokemonListRow index={index} style={style} pokemon={data[index]} />}
				</FixedSizeList>
			)}
		</div>
	);
};
