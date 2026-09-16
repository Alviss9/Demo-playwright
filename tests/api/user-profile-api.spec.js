// @ts-check
const { test, expect } = require('@playwright/test');

const apiBaseUrl = 'https://practice.expandtesting.com/notes/api';
const registerEndpoint = `${apiBaseUrl}/users/register`;
const loginEndpoint = `${apiBaseUrl}/users/login`;
const profileEndpoint = `${apiBaseUrl}/users/profile`;
const password = 'Playwright@123';

test.describe('Users API', () => {
  test('gets the authenticated user profile', async ({ request }) => {
    const email = `playwright-profile-${Date.now()}@example.com`;
    const name = 'Playwright Profile User';

    const registerResponse = await request.post(registerEndpoint, {
      form: { name, email, password },
    });
    expect(registerResponse.status()).toBe(201);

    const loginResponse = await request.post(loginEndpoint, {
      form: { email, password },
    });
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    expect(loginBody.data.token).toBeTruthy();

    const profileResponse = await request.get(profileEndpoint, {
      headers: { 'x-auth-token': loginBody.data.token },
    });

    expect(profileResponse.status()).toBe(200);

    const profileBody = await profileResponse.json();
    expect(profileBody).toMatchObject({
      success: true,
      status: 200,
      message: 'Profile successful',
      data: {
        name,
        email,
      },
    });
    expect(profileBody.data.id).toBeTruthy();
  });
});
