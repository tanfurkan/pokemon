import { useEffect, useState } from 'react';
import axios from 'axios';

import { IUseFetch } from '../types';

function useFetch<T = unknown>(url: string): IUseFetch<T> {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<T | undefined>(undefined);
	const [error, setError] = useState<string>('');

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
}

export default useFetch;
