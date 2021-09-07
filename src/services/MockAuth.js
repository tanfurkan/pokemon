import MockAdapter from 'axios-mock-adapter';
import authAxios from './auth';

// This sets the mock adapter on the default instance
const mockAdapter = new MockAdapter(authAxios, { delayResponse: 2500 });

mockAdapter.onPost('/login').reply((config) => {
	const { email, password } = JSON.parse(config.data);

	if (email === 'test@startuphero.es' && password === 'foobar123') {
		return [200, { id: 1, name: 'John Smith' }];
	}

	return [
		401,
		{
			message: 'Your email and password do not match!',
		},
	];
});

export default mockAdapter;
