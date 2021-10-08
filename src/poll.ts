interface PollOptions {
  retry?: number;
  interval?: number; // milliseconds
}

const defaultOptions: PollOptions = {
  retry: 10,
  interval: 100,
};

/**
 * @description Poll until `cb` returns true
 */
export const poll = async (
  cb: () => boolean | Promise<boolean>,
  options: PollOptions = {},
): Promise<void> =>
  new Promise((resolve, reject) => {
    options.retry ||= defaultOptions.retry as number;
    options.interval ||= defaultOptions.interval;
    const _poll = async (): Promise<void> => {
      const success = await cb();
      if (success) {
        resolve(undefined);
        return;
      }

      if (!options.retry || options.retry < 0) {
        reject(Error('poll failed'));
        return;
      }

      options.retry -= 1;

      setTimeout(() => {
        _poll();
      }, Number(options.interval));
    };
    return _poll();
  });

const SLEEP_POLL_INTERVAL = 1000;
export const sleep = async (seconds = 1): Promise<void> =>
  poll(
    () => {
      if (seconds <= 0) {
        return true;
      }
      seconds -= 1;
      return false;
    },
    {
      retry: seconds,
      interval: SLEEP_POLL_INTERVAL,
    },
  );

export default poll;
