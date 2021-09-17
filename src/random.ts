/**
 * @description Generate a random string of specified length
 */
export const randomString = (length = 16): string =>
  Array.from({ length: Math.ceil(length / 8.0) })
    .map(() => Math.random().toString(36).padEnd(13, '0').slice(2, 10))
    .join('')
    .slice(0, length);
