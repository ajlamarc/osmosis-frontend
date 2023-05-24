import { useContext, useEffect, useState } from "react";

import { TomeContext } from "~/pages/_app";

/** Stores and syncs to a value in `localStorage` at `key`.
 *  Will `JSON.stringify` and `JSON.parse` value of type `T`.
 *  Use `null` over `undefined` state.
 */
export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const kv = useContext(TomeContext);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // init from localstorage
  useEffect(() => {
    const getStoredValue = async () => {
      if (typeof kv !== "undefined") {
        const item = await kv.get(key);
        if (item) {
          // @ts-ignore
          setStoredValue(item);
        }
      }
    };
    getStoredValue();
  }, [key, setStoredValue, kv]);

  const setValue = (value: T) => {
    if (typeof kv !== "undefined" && key) {
      //  @ts-ignore
      kv.set(key, value)
        .then((success) => {
          if (success) {
            setStoredValue(value);
          } else {
            console.error("Failed to set value in Urbit.");
          }
        })
        .catch((error) => console.error(error));
    }
  };
  return [storedValue, setValue];
}
