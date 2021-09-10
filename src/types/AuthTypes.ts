export interface AuthUser {
	id: number;
	name?: string;
	email?: string;
}

export type AuthContextType = {
	authenticatedUser: AuthUser | null;
	setAuthUser: (user: AuthUser) => void;
	removeAuthUser: () => void;
};
