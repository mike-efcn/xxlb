import { randomString } from './random';

describe('random', () => {
  describe('#randomString', () => {
    it('generates random string', () => {
      const str1 = randomString();
      expect(str1).toBeTruthy();
      const str2 = randomString();
      expect(str2).toBeTruthy();
      expect(str1).not.toEqual(str2);
    });
    it('generates random string of specified length', () => {
      expect(randomString().length).toEqual(16);
      [1, 7, 9, 20, 100].forEach((length) => {
        const str = randomString(length);
        expect(str.length).toEqual(length);
      });
      expect(randomString(-100)).toEqual('');
    });
  });
});
