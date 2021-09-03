import React from 'react';
import { AppBar, CardMedia, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		background: 'linear-gradient(190deg, hsla(15, 62%, 50%, 1) 0%, hsla(29, 85%, 60%, 1) 100%)',
	},
	iconButton: {
		marginRight: theme.spacing(2),
	},
	pokemonImage: {
		height: 42,
		width: 42,
	},
}));

const PokemonHeader = () => {
	const classes = useStyles();

	return (
		<AppBar position='static' className={classes.root}>
			<Toolbar variant='dense'>
				<IconButton
					edge='start'
					className={classes.iconButton}
					color='inherit'
					aria-label='menu'
				>
					<div>
						<CardMedia
							component={'img'}
							className={classes.pokemonImage}
							image='/pokeball.png'
							title='Pokemon Ball'
							alt='Pokemon Ball'
						/>
					</div>
				</IconButton>
				<Typography variant='h6' color='inherit'>
					Pokemon App
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default PokemonHeader;
