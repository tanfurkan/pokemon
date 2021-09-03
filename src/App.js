import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { PokemonDetails, PokemonList } from './Pokemon';
import PokemonHeader from './header';

const App = () => (
	<div className='App'>
		<CssBaseline />
		<Router>
			<PokemonHeader />
			<Container maxWidth='lg'>
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
			</Container>
		</Router>
	</div>
);

export default App;
