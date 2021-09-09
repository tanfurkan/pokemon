export interface AuthUser {
	id: string;
	name?: string;
	email?: string;
}

export type AuthContextType = {
	authenticatedUser: AuthUser | null;
	setAuthUser: (user: AuthUser) => void;
	removeAuthUser: () => void;
}


export interface IFetchData  {
	isLoading: boolean
	data?: IPokemonDetail | IPokemonList | null
	error?: string|null
}


export type PokemonParamType = {
	pokemonName: string
}

export interface IPokemonList {
	results : IPokemon[]
}

export interface IPokemonDetail {
	name: string
	weight: string
	height: string
	base_experience: string
	abilities: IPokemonAbility[]
	types: IPokemonType[]
	stats: IPokemonStat[]
}

interface IPokemonAbility {
	ability : {
		name: string
	}
}

interface IPokemonType {
	type : {
		name: string
	}
}

interface IPokemonStat {
	base_stat : string
	stat : {
		name: string
	}
}

export interface IPokemon {
	name: string
}