import { withTimeout } from './promise';

describe('promise', () => {
  describe('#withTimeout', () => {
    describe('promise resolves within timeout', () => {
      it('returns resolved promise', async () => {
        const duration = 200;
        const timeout = 500;

        const doSomething = async (value = 96) =>
          new Promise<number>((resolve) => {
            setTimeout(() => {
              resolve(value);
            }, duration);
          });

        expect(withTimeout(doSomething(), { timeout })).resolves.toEqual(96);
        const result = await withTimeout(doSomething(97), { timeout });
        expect(result).toEqual(97);
      });
    });
    describe('promise rejects within timeout', () => {
      it('returns rejected promise', async () => {
        const duration = 200;
        const timeout = 500;

        const doSomething = async () =>
          new Promise<number>((_, reject) => {
            setTimeout(() => {
              reject(Error('SomeError'));
            }, duration);
          });

        await expect(withTimeout(doSomething(), { timeout })).rejects.toThrow(
          Error('SomeError'),
        );
      });
    });
    describe('promise resolves after timeout', () => {
      it('returns timeout promise', async () => {
        const duration = 999;
        const timeout = 500;

        const doSomething = async () =>
          new Promise<number>((resolve) => {
            setTimeout(() => {
              resolve(96);
            }, duration);
          });

        await expect(withTimeout(doSomething(), { timeout })).rejects.toThrow(
          Error('Timeout'),
        );
      });
    });
    describe('promise rejects after timeout', () => {
      it('returns timeout promise', async () => {
        const duration = 999;
        const timeout = 500;

        const doSomething = async () =>
          new Promise<number>((_, reject) => {
            setTimeout(() => {
              reject(Error('SomeError'));
            }, duration);
          });

        await expect(withTimeout(doSomething(), { timeout })).rejects.toThrow(
          Error('Timeout'),
        );
      });
    });
  });
});
