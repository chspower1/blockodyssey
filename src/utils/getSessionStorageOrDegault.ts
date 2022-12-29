export const getSessionStorageOrDegault = (key: string, defaultValue: string) => {
  const stored = sessionStorage.getItem(key);
  return stored ? stored : defaultValue;
};
