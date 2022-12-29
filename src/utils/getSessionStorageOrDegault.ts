interface GetSessionStorageOrDefaultProps<T> {
  key: string;
  defaultValue: T;
}
export const getSessionStorageOrDefault = <T>({
  key,
  defaultValue,
}: GetSessionStorageOrDefaultProps<T>) => {
  const stored = sessionStorage.getItem(key);
  return stored ? (JSON.parse(stored) as T) : defaultValue;
};
