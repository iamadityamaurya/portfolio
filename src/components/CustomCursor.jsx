import { useEffect } from 'react';

// Custom cursor disabled — native OS system cursor restored
const CustomCursor = () => {
  useEffect(() => {
    document.body.classList.remove('custom-cursor-active');
  }, []);

  return null;
};

export default CustomCursor;
