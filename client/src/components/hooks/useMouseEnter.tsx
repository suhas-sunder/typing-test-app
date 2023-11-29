import { useEffect, useState, useRef } from "react";

interface PropType {
  elementRef: React.RefObject<HTMLDivElement> | null;
}

function useMouseEnter({ elementRef }: PropType) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const element = elementRef?.current;

    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [elementRef]);

  return [isHovered, ref];
}

export default useMouseEnter;
