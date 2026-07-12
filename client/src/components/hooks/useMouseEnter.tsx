import { useEffect, useRef, useState } from "react";

type PropType = {
  elementRef: React.RefObject<HTMLDivElement | null> | null;
};

// Used by hover animation components
export default function useMouseEnter({ elementRef }: PropType) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef?.current ?? ref.current;

    if (!element) {
      return;
    }

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef]);

  return [isHovered, ref] as const;
}