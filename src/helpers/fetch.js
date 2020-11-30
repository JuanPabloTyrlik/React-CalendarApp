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

export const fetchWithToken = (endpoint, data, method = 'GET') => {
    const token = localStorage.getItem('token') || '';
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        return fetch(url, {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }
};
