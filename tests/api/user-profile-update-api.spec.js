// @ts-check
const { test, expect } = require('@playwright/test');

const apiBaseUrl = 'https://practice.expandtesting.com/notes/api';
const registerEndpoint = `${apiBaseUrl}/users/register`;
const loginEndpoint = `${apiBaseUrl}/users/login`;
const profileEndpoint = `${apiBaseUrl}/users/profile`;
const password = 'Playwright@123';

test.describe('Users API', () => {
  test('updates the authenticated user profile', async ({ request }) => {
    const email = `playwright-profile-update-${Date.now()}@example.com`;
    const name = 'Playwright Profile User';
    const updatedProfile = {
      name: 'Updated Playwright User',
      phone: '0123456789',
      company: 'Playwright QA',
    };

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

    const updateResponse = await request.patch(profileEndpoint, {
      headers: { 'x-auth-token': loginBody.data.token },
      form: updatedProfile,
    });

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();
    expect(updateBody).toMatchObject({
      success: true,
      status: 200,
      message: 'Profile updated successful',
      data: {
        email,
        ...updatedProfile,
      },
    });
    expect(updateBody.data.id).toBeTruthy();
  });
});
