import { useState, useEffect } from "react";

/**
 * Wait a certain amount of time (ms) before triggering a change.
 * Good for waiting for user to finish typing before hitting an api
 * endpoint, for example.
 * @param {*} input value to debounce
 * @param {*} ms time in ms to wait before triggering change
 */
export default function useDebounce(input, ms) {
  const [debounced, setDebounced] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(input), ms);
    return () => clearTimeout(timeout);
  }, [input, ms]);

  return debounced;
}