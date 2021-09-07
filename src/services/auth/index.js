import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_LIVE_URL : process.env.REACT_APP_DEV_URL;

const authAxios = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default authAxios;