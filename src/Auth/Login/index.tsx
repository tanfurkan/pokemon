import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
	Avatar,
	Button,
	Checkbox,
	CircularProgress,
	Container,
	FormControlLabel,
	Grid,
	Link,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';

import { pokemonGIF_URL, pokemonIMG_URL } from '../../Utils/constants';
import authAxios from '../../services/auth';
import { AuthContext } from '../AuthContext';


const useStyles = makeStyles((theme) => ({
	loginContainer: {
		height: 'calc(100vh - 62px)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(6, 8),
		borderRadius: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
	},
	avatar: {
		width: 80,
		height: 80,
		marginBottom: theme.spacing(4),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(2, 0),
		height: theme.spacing(6),
	},
	linkContainer: {
		marginTop: theme.spacing(1),
	},
}));

const validationSchema = yup.object({
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string()
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
});

export const LoginPage : React.FC<unknown> = () => {
	const classes = useStyles();
	const history = useHistory();

	const { setAuthUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: 'test@startuphero.es',
			password: 'foobar123',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setLoading(true);
			authAxios
				.post('/login', {
					email: values.email,
					password: values.password,
				})
				.then((response: AxiosResponse) => {
					const user = response.data;
					setAuthUser(user);
					setLoading(false);
					history.push('/');
				})
				.catch((error : AxiosError) => {
					window.alert(error?.response?.data?.message);
					setLoading(false);
				});
		},
	});

	return (
		<Container component='main' maxWidth='sm' className={classes.loginContainer}>
			<div className={classes.paper}>
				<Avatar
					className={classes.avatar}
					alt={'Loading!'}
					src={loading ? pokemonGIF_URL : pokemonIMG_URL}
				/>
				<Typography component='h1' variant='h5'>
					Sign In
				</Typography>
				<form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
					<TextField
						id='email'
						label='Email Address'
						name='email'
						type='email'
						variant='outlined'
						margin='normal'
						fullWidth
						required
						autoFocus
						autoComplete='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						id='password'
						label='Password'
						name='password'
						type='password'
						variant='outlined'
						margin='normal'
						fullWidth
						required
						autoComplete='current-password'
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						color='primary'
						variant='contained'
						disabled={loading}
						className={classes.submit}
						fullWidth
					>
						{loading ? <CircularProgress size={28} color='secondary' /> : 'Sign In'}
					</Button>
					<Grid container className={classes.linkContainer}>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href='#' variant='body2'>
								{'Don\'t have an account? Sign Up'}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
