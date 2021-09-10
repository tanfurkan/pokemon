import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { AuthContext } from '../../Auth/AuthContext';

const ProtectedRoute: React.FC<RouteProps> = (props) => {
	const { authenticatedUser } = useContext(AuthContext);

	if (authenticatedUser) {
		return <Route {...props} component={props.component} render={undefined} />;
	}
	return <Redirect to='/login' />;
};

export default ProtectedRoute;
