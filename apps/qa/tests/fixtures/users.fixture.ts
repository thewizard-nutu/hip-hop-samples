export const testUsers = {
  validUser: {
    email: 'testuser@example.com',
    password: 'SecurePass123!',
    name: 'Test User',
    confirmPassword: 'SecurePass123!',
  },
  newUser: {
    email: 'newuser@example.com',
    password: 'NewPass456!',
    name: 'New User',
    confirmPassword: 'NewPass456!',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },
  adminUser: {
    email: 'admin@example.com',
    password: 'AdminPass789!',
    name: 'Admin User',
  },
};

export const authTokens = {
  validToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  expiredToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkV4cGlyZWQgVG9rZW4iLCJleHAiOjE2MDAwMDAwMDB9.invalid',
  invalidToken: 'invalid.token.here',
};
