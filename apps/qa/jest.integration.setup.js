// Setup for API integration tests

// Set test environment
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/hip-hop-samples-test';

// Suppress console logs during tests
const originalLog = console.log;
const originalError = console.error;

beforeAll(() => {
  // Comment these out if you need to see logs
  // console.log = jest.fn();
  // console.error = jest.fn();
});

afterAll(() => {
  console.log = originalLog;
  console.error = originalError;
});
