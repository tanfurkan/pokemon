import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import { LoginPage } from './Auth';
import AuthProvider from './Auth/AuthContext';
import { PokemonDetails, PokemonList } from './Pokemon';
import ProtectedRoute from './common/ProtectedRoute';

const App : React.FC<unknown> = () => (
	<AuthProvider>
		<div className='App'>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path='/login'>
						<LoginPage />
					</Route>
					<ProtectedRoute exact path='/' component={PokemonList} />
					<ProtectedRoute path='/pokemon/:pokemonName' component={PokemonDetails} />
					<Route>
						<div>
							404
							<Link to='/'>Go Home</Link>
						</div>
					</Route>
				</Switch>
			</Router>
		</div>
	</AuthProvider>
);

export default App;
