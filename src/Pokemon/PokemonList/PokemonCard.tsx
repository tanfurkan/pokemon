import React from 'react';

import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';

import capitalizeFirstLetter from '../../Utils/capitalizeFirstLetter';
import { IPokemon } from '../../types';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		flexGrow: 1,
		padding: theme.spacing(1),
	},
	cardImage: {
		height: 240,
		width: '100%',
		objectFit: 'contain',
	},
}));

const PokemonListCard : React.FC<{pokemon : IPokemon | null}> = ({ pokemon = null }) => {
	const classes = useStyles();

	if (!pokemon) {
		return null;
	}

	return (
		<Grid container item xs={6} md={4} lg={3} component={'a'} href={`/pokemon/${pokemon.name}`}>
			<Card className={classes.root}>
				<CardActionArea>
					<Grid item xs={12}>
						<CardMedia
							component={'img'}
							className={classes.cardImage}
							alt={pokemon.name}
							image={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
							title={pokemon.name}
						/>
					</Grid>
					<Grid item xs={12}>
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2' align='center'>
								{capitalizeFirstLetter(pokemon.name)}
							</Typography>
						</CardContent>
					</Grid>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

export default PokemonListCard;
