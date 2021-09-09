import React, { memo, useState } from 'react';

import { AuthContextType, AuthUser } from '../types';
import { LOCAL_STORAGE_USER } from '../Utils/constants';

const authContextDefaultValues: AuthContextType = {
	authenticatedUser: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setAuthUser:  () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	removeAuthUser: () => {},
};

export const AuthContext = React.createContext<AuthContextType>(authContextDefaultValues);

const AuthProvider: React.FC<React.ReactNode>  = ({ children }) => {
	const [authenticatedUser, setAuthenticatedUser] = useState<AuthUser | null>(
		JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER) as string)
	);

	const setAuthUser = (user: AuthUser) => {
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
			{children}
		</AuthContext.Provider>
	);
};

export default memo(AuthProvider);
