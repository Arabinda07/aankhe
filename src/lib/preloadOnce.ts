export function createPreloadOnce<T>(load: () => Promise<T>) {
  let promise: Promise<T> | null = null;

  return () => {
    promise ??= load();
    return promise;
  };
}
