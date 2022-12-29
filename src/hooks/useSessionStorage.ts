import { SessionStorageProps } from "@type/sessionSotrage";
import { getSessionStorageOrDefault } from "@utils/getSessionStorageOrDegault";
import { useEffect, useState } from "react";

export function useSessionStorage<T>({
  key,
  defaultValue,
}: SessionStorageProps<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(getSessionStorageOrDefault<T>({ key, defaultValue }));

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
