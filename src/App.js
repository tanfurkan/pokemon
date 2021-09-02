import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { PokemonDetails, PokemonList } from './Pokemon';

const App = () => (
	<div className='App'>
		<CssBaseline />
		<Router>
			<Switch>
				<Route exact path='/'>
					<PokemonList />
				</Route>
				<Route path='/pokemon/:pokemonName'>
					<div>
						<PokemonDetails />
					</div>
				</Route>
				<Route>
					<div>
						404
						<Link to='/'>Go Home</Link>
					</div>
				</Route>
			</Switch>
		</Router>
	</div>
);

export default App;
