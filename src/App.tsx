import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { Container, CssBaseline } from '@material-ui/core';

import { LoginPage } from './Auth';
import AuthProvider from './Auth/AuthContext';
import { PokemonDetails, PokemonList } from './Pokemon';
import ProtectedRoute from './common/ProtectedRoute';
import { PokemonHeader } from './common/Header';

const App: React.FC<unknown> = () => (
	<AuthProvider>
		<div className='App'>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path='/login'>
						<LoginPage />
					</Route>
					<Switch>
						<>
							<PokemonHeader />
							<Container maxWidth='lg'>
								<ProtectedRoute exact path='/' component={PokemonList} />
								<ProtectedRoute
									path='/pokemon/:pokemonName'
									component={PokemonDetails}
								/>
							</Container>
						</>
					</Switch>
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
