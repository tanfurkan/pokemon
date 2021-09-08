import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../../Auth/AuthContext';

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const { authenticatedUser } = useContext(AuthContext);

	return (
		<Route
			{...restOfProps}
			render={(props) =>
				authenticatedUser ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	);
}

export default ProtectedRoute;
