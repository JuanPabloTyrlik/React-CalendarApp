export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
};
