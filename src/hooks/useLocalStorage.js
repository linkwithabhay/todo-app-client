import { useEffect, useState } from "react";

const PREFIX = "ToDo-App-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return initialValue();
    } else if (initialValue) {
      return initialValue;
    } else {
      return "";
    }
  });
  // console.log(`useLocalStorage hook value for ${prefixedKey} is`, value);

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
