import { useState, useEffect, RefObject } from 'react';

function useDragScroll(ref: RefObject<HTMLElement>) {
  const [startScroll, setStartScroll] = useState(0);
  const [startX, setStartX]           = useState(0);
  const [isDragging, setIsDragging]   = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    function onMouseDown(e: MouseEvent) {
      if (element) {
        setStartX(e.pageX);
        setStartScroll(element.scrollLeft);
        setIsDragging(true);
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (!isDragging || !element) return;
      e.preventDefault();
      const x = e.pageX;
      element.scrollLeft = startScroll - (x - startX);
    }

    function onMouseUp() {
      setIsDragging(false);
    }

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);
    element.addEventListener('mouseleave', onMouseUp);

    return () => {
      if (element) {
        element.removeEventListener('mousedown', onMouseDown);
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('mouseup', onMouseUp);
        element.removeEventListener('mouseleave', onMouseUp);
      }
    };
  }, [ref, isDragging, startScroll, startX]);

  return isDragging;
}

export default useDragScroll;

