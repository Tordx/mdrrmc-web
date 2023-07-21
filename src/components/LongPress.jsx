import { useState, useRef, useEffect } from 'react';

const LongPress = (callback, ms = 300) => {
  const [isPressing, setIsPressing] = useState(false);
  const timeoutRef = useRef(null);

  const startPress = () => {
    setIsPressing(true);
    timeoutRef.current = setTimeout(callback, ms);
  };

  const stopPress = () => {
    setIsPressing(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    onMouseDown: startPress,
    onMouseUp: stopPress,
    onMouseLeave: stopPress,
    onTouchStart: startPress,
    onTouchEnd: stopPress,
    isPressing,
  };
};

export default LongPress;
