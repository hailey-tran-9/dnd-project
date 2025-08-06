import { useEffect, useRef } from "react";

export const useTimer = (callback = () => {}, delay = 0) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(timer);
  }, [delay]);
};
