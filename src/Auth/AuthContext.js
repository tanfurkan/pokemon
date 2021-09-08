import React, { memo, useState } from 'react';
import { LOCAL_STORAGE_USER } from '../Utils/constants';

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
	const [authenticatedUser, setAuthenticatedUser] = useState(() =>
		JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER)),
	);

	const setAuthUser = (user) => {
		localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
		setAuthenticatedUser(user);
	};

	const removeAuthUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_USER);
		setAuthenticatedUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				authenticatedUser: authenticatedUser,
				setAuthUser: setAuthUser,
				removeAuthUser: removeAuthUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default memo(AuthProvider);
