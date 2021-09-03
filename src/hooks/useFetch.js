import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(url)
			.then((response) => {
				//  results, count, next, previous can be used from response
				setData(response?.data);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(`Error during fetch! - ${error?.response?.data || ''}`);
				setIsLoading(false);
			});
	}, [url]);

	return { isLoading, data, error };
};

export default useFetch;
