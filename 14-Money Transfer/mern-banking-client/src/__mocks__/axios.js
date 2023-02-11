/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
/** Mocking axios APIs */
export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
};
