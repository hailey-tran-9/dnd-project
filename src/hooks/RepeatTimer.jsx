import { useEffect, useState } from "react";

export const useRepeatTimer = (initialTime) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalID;
    if (isRunning) {
      intervalID = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime < 1000) {
            setIsRunning(false);
            return 0;
          } else {
            return prevTime - 1000;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [isRunning]);

  return { time };
};
