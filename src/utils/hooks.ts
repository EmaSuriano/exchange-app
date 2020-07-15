import { useEffect, useRef, useContext } from 'react';
import { ResponsiveContext } from 'grommet';

export const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef<() => any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export const useMobileViewport = () => {
  const size = useContext(ResponsiveContext);

  return size === 'small';
};
