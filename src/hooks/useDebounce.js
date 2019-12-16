import { useState, useEffect } from "react";

/**
 * @param {*} input 
 * @param {*} ms time in ms to wait before triggering change
 */
export default function useDebounce(input, ms) {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(input), ms);
    return () => clearTimeout(timeout);
  }, [input, ms]);

  return debounced;
}