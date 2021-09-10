import React from 'react';
import { useParams } from 'react-router-dom';

import { CardMedia, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { grey } from '@material-ui/core/colors';

import useFetch from '../../hooks/useFetch';
import capitalizeFirstLetter from '../../Utils/capitalizeFirstLetter';
import { IPokemonDetail, PokemonParamType } from '../../types';
import { TypeBackgroundColor } from '../../Utils/Enum';
import { getRandomRGBString } from '../../Utils/getRandomRGBString';

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
	cardImage: {
		maxHeight: 400,
		width: '100%',
		objectFit: 'contain',
	},
	typeContainer: {
		marginTop: theme.spacing(1),
	},
	typeInfo: {
		width: 200,
		maxWidth: 240,
		padding: theme.spacing(1),
		borderRadius: theme.spacing(1),
		textAlign: 'center',
		fontSize: 15,
		fontWeight: 500,
		color: grey[50],
		marginRight: theme.spacing(0.5),
		marginBottom: theme.spacing(0.5),
	},
	detailTitle: {
		marginTop: theme.spacing(1),
	},
}));

const TypeInfo: React.FC<{ type: string }> = ({ type }) => {
	const classes = useStyles();
	const color = TypeBackgroundColor[type] || getRandomRGBString();
	const colorStyle = {background: color};

	return (
		<div className={classes.typeInfo} style={colorStyle}>
			{capitalizeFirstLetter(type)}
		</div>
	);
};

export const PokemonDetails: React.FC<unknown> = () => {
	const classes = useStyles();
	const { pokemonName } = useParams<PokemonParamType>();
	const { data, isLoading, error } = useFetch<IPokemonDetail | null>(
		`https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
	);

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
			<div>
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
										{data?.name?.toUpperCase()}
									</Typography>
								</Grid>
								<Grid
									container
									item
									xs={12}
									justifyContent='center'
									spacing={4}
								>
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
											{data?.abilities?.map((abilityObject, key) => (
												<TypeInfo
													type={abilityObject.ability.name}
													key={key}
												/>
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
											{data?.types?.map((typeObject, key) => (
												<TypeInfo
													type={typeObject.type.name}
													key={key}
												/>
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
											<TypeInfo type={`Weight ${data?.weight}`} />
											<TypeInfo type={`Height ${data?.height}`} />
											<TypeInfo
												type={`Experience ${data?.base_experience}`}
											/>
											{data?.stats?.map((statObject, key) => {
												const stat =
														statObject?.stat?.name +
														' : ' +
														statObject?.base_stat;
												return <TypeInfo type={stat} key={key} />;
											})}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</>
					)}
				</Grid>
			</div>
		</>
	);
};
