import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  duration: number;
  onTimeUp: () => void;
  running: boolean;
}

export function useTimer({ duration, onTimeUp, running }: UseTimerOptions) {
  const [remaining, setRemaining] = useState(duration);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    setRemaining(duration);
  }, [duration]);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      onTimeUpRef.current();
      return;
    }
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          onTimeUpRef.current();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, remaining]);

  const reset = useCallback(() => {
    setRemaining(duration);
  }, [duration]);

  const pct = (remaining / duration) * 100;

  return { remaining, pct, reset };
}
