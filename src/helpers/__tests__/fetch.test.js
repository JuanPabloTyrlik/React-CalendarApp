const { fetchWithoutToken, fetchWithToken } = require('../fetch');

describe('Tests on Fetch', () => {
    let token = '';
    test('should call fetch without sending token', async () => {
        const resp = await fetchWithoutToken(
            'auth/login',
            {
                email: 'juan.pablo@gmail.com',
                password: 'Ab1-bccH',
            },
            'POST'
        );
        expect(resp instanceof Response).toBe(true);
        const body = await resp.json();
        expect(body.ok).toBe(true);
        token = body.token;
    });
    test('should call fetch with token', async () => {
        localStorage.setItem('token', token);
        const resp = await fetchWithToken('auth/token');
        expect(resp instanceof Response).toBe(true);
        const body = await resp.json();
        expect(body.ok).toBe(true);
    });
});
