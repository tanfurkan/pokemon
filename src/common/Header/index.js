import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppBar, CardMedia, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';

import { HeaderUser } from '../HeaderUser';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		background: 'linear-gradient(190deg, hsla(15, 62%, 50%, 1) 0%, hsla(29, 85%, 60%, 1) 100%)',
	},
	iconButton: {
		marginRight: theme.spacing(2),
	},
	pokemonImage: {
		height: 38,
		width: 38,
	},
	appName: {
		flexGrow: 1,
	},
}));

export const PokemonHeader = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<AppBar position='static' className={classes.root}>
			<Toolbar variant='dense'>
				<IconButton className={classes.iconButton} onClick={() => history.push('/')}>
					<CardMedia
						component={'img'}
						className={classes.pokemonImage}
						image='/pokeball.png'
						title='Pokemon Ball'
						alt='Pokemon Ball'
					/>
				</IconButton>
				<Typography variant='h6' color='inherit' className={classes.appName}>
					Pokemon App
				</Typography>
				<HeaderUser />
			</Toolbar>
		</AppBar>
	);
};
