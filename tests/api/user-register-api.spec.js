// @ts-check
const { test, expect } = require('@playwright/test');

const registerEndpoint = 'https://practice.expandtesting.com/notes/api/users/register';

test.describe('Users API', () => {
  test('registers a new user', async ({ request }) => {
    const email = `playwright-${Date.now()}@example.com`;
    const response = await request.post(registerEndpoint, {
      form: {
        name: 'Playwright Test User',
        email,
        password: 'Playwright@123',
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject({
      success: true,
      status: 201,
      message: 'User account created successfully',
      data: {
        name: 'Playwright Test User',
        email,
      },
    });
    expect(body.data.id).toBeTruthy();
  });
});
