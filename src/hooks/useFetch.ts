import { useEffect, useState } from 'react';
import axios from 'axios';

import { IUseFetch } from '../types';

function useFetch<T = unknown>(url: string): IUseFetch<T> {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<T | undefined>(undefined);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		setIsLoading(true);
		const source = axios.CancelToken.source();
		let canceled = false;
		axios
			.get(url, {
				cancelToken: source.token,
			})
			.then((response) => {
				//  results, count, next, previous can be used from response
				if (!canceled) {
					setData(response?.data);
					setIsLoading(false);
				}
			})
			.catch((error) => {
				if (!canceled) {
					setError(`Error during fetch! - ${error?.response?.data || ''}`);
					setIsLoading(false);
				}
			});
		return () => {
			canceled = true;
			source.cancel();
		};
	}, [url]);

	return { isLoading, data, error };
}

export default useFetch;
