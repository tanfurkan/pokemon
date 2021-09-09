export interface IUseFetch<T> {
	isLoading?: boolean
	data?: T
	error?: string
}

export interface IPokemon {
	name: string
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
