import poll, { sleep } from './poll';

describe('poll', () => {
  describe('#poll', () => {
    it('returns success', () => {
      //
    });
    it('returns failure after timeout', () => {
      expect(poll(() => false)).rejects.toEqual(Error('poll failed'));
    });
  });
  describe('#sleep', () => {
    it('returns resolved promise after default time', async () => {
      const time1 = Date.now();
      await sleep();
      const time2 = Date.now();
      expect(time2 - time1).toBeGreaterThanOrEqual(1);
    });
    it('returns resolved promise after specified time', async () => {
      const interval = 3;
      const time1 = Date.now();
      await sleep();
      const time2 = Date.now();
      expect(time2 - time1).toBeGreaterThanOrEqual(interval);
    });
  });
});
