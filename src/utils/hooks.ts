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

const RESPONSIVE_VIEWPORT = {
  desktop: 'large',
  tablet: 'medium',
  mobile: 'small',
};

export const useMobileViewport = () => {
  const size = useContext(ResponsiveContext);

  return size === RESPONSIVE_VIEWPORT.mobile;
};

export const useTabletViewport = () => {
  const size = useContext(ResponsiveContext);
  const sizes = [RESPONSIVE_VIEWPORT.mobile, RESPONSIVE_VIEWPORT.tablet];
  return sizes.includes(size);
};
