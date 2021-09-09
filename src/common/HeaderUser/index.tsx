import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, makeStyles, Typography } from '@material-ui/core';

import '../../services/index';
import { AuthContext } from '../../Auth/AuthContext';


const useStyles = makeStyles(() => ({
	userBox: {
		width: 100,
		display: 'flex',
		justifySelf: 'flex-end',
		flexDirection: 'column',
	},
}));

export const HeaderUser: React.FC<unknown> = () => {
	const classes = useStyles();
	const history = useHistory();

	const { authenticatedUser, removeAuthUser } = useContext(AuthContext);

	const handleSignOut = () => {
		removeAuthUser();
		history.push('/login');
	};

	if (!authenticatedUser) {
		return null;
	}

	return (
		<Box className={classes.userBox}>
			<Typography variant='body2' align='center'>
				{authenticatedUser.name}
			</Typography>
			<Button size='small' onClick={handleSignOut}>
				Sign Out
			</Button>
		</Box>
	);
};
