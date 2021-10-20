interface WithTimeoutOptions {
  timeout: number;
}

export function withTimeout<T>(
  promise: Promise<T>,
  options: WithTimeoutOptions,
): Promise<T> {
  let ref: NodeJS.Timeout;
  const timeoutPromise = () =>
    new Promise<T>((_, reject) => {
      ref = setTimeout(() => {
        clearTimeout(ref);
        reject(Error('Timeout'));
      }, options.timeout);
    });
  return Promise.race<Promise<T>>([
    timeoutPromise(),
    promise.then((value) => {
      clearTimeout(ref);
      return value;
    }),
  ]);
}
