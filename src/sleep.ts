const ONE_SECOND = 1000;
const sleep = async (seconds = 1): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, seconds * ONE_SECOND);
  });

export default sleep;
