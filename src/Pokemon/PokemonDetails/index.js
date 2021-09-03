import React from 'react';
import { useParams } from 'react-router-dom';

import { CardMedia, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { grey } from '@material-ui/core/colors';

import useFetch from '../../hooks/useFetch';
import capitalizeFirstLetter from '../../Utils/capitalizeFirstLetter';

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
	cardImage: {
		maxHeight: 400,
		width: '100%',
		objectFit: 'contain',
	},
	typeContainer: {
		marginTop: theme.spacing(1),
	},
	typeInfo: {
		width: 120,
	},
	detailTitle: {
		marginTop: theme.spacing(1),
	},
}));

const TypeInfo = ({ type }) => {
	let style = {
		width: 200,
		maxWidth: 240,
		padding: 8,
		borderRadius: 8,
		textAlign: 'center',
		fontSize: 15,
		fontWeight: 500,
		color: grey[50],
		marginRight: 4,
		marginBottom: 4,
	};

	switch (type) {
		case 'fire':
			style = { ...style, background: 'red' };
			break;
		case 'flying':
			style = { ...style, background: 'aqua' };
			break;
		case 'grass':
			style = { ...style, background: 'green' };
			break;
		case 'poison':
			style = { ...style, background: 'purple' };
			break;
		default: {
			let randomRColor = Math.floor(Math.random() * 255);
			let randomGColor = Math.floor(Math.random() * 255);
			let randomBColor = Math.floor(Math.random() * 255);
			style = { ...style, background: `rgb(${randomRColor},${randomGColor},${randomBColor}` };
			break;
		}
	}

	return <div style={style}>{capitalizeFirstLetter(type)}</div>;
};

export const PokemonDetails = () => {
	const classes = useStyles();
	let { pokemonName } = useParams();
	const { data, isLoading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

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
					<Grid
						container
						item
						xs={12}
						spacing={4}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Grid item xs={12}>
							{/*Pokemon Name*/}
							<Typography variant='h4' gutterBottom align='center'>
								{data?.name.toUpperCase()}
							</Typography>
						</Grid>
						<Grid container item xs={12} justifyContent='center' spacing={4}>
							{/*Pokemon Info*/}
							<Grid item xs={12} md={6}>
								{/*Pokemon Image*/}
								<CardMedia
									component={'img'}
									className={classes.cardImage}
									alt={data?.name}
									image={`https://img.pokemondb.net/artwork/large/${data?.name}.jpg`}
									title={data?.name}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								{/*Pokemon Details*/}
								<Grid item xs={12}>
									<Typography variant='h5'>Abilities</Typography>
								</Grid>
								<Grid
									container
									item
									xs={12}
									justifyContent='flex-start'
									className={classes.typeContainer}
								>
									{data?.abilities?.map((abilityObject) => (
										<TypeInfo type={abilityObject.ability.name} />
									))}
								</Grid>
								<Grid item xs={12} className={classes.detailTitle}>
									<Typography variant='h5'>Types</Typography>
								</Grid>
								<Grid
									container
									item
									xs={12}
									justifyContent='flex-start'
									className={classes.typeContainer}
								>
									{data?.types?.map((typeObject) => (
										<TypeInfo type={typeObject.type.name} />
									))}
								</Grid>
								<Grid item xs={12} className={classes.detailTitle}>
									<Typography variant='h5'>Stats</Typography>
								</Grid>
								<Grid
									container
									item
									xs={12}
									justifyContent='flex-start'
									className={classes.typeContainer}
								>
									<TypeInfo type={`Weight ${data.weight}`} />
									<TypeInfo type={`Height ${data.height}`} />
									<TypeInfo type={`Experience ${data.base_experience}`} />
									{data?.stats?.map((statObject) => {
										let stat =
											statObject?.stat?.name + ' : ' + statObject?.base_stat;
										return <TypeInfo type={stat} />;
									})}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</>
			)}
		</Grid>
	);
};
