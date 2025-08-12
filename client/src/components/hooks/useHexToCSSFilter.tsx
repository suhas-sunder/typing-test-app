import { hexToCSSFilter } from "hex-to-css-filter";
import { useEffect } from "react";

type FilterProps = {
  hexColourCode: string;
  elementRef: HTMLElement | null;
};

export default function useHexToCSSFilter({
  imgRef,
  divsRef,
  hexCodes,
}: {
  imgRef: { current: HTMLImageElement | null };
  divsRef: { current: (HTMLDivElement | null)[] };
  hexCodes: string[];
}) {
  useEffect(() => {
    const applyFilter = ({ hexColourCode, elementRef }: FilterProps) => {
      const cssFilter = hexToCSSFilter(hexColourCode);
      const filterValue = cssFilter.filter.replace(/;/g, "");
      if (elementRef) elementRef.style.filter = filterValue;
    };

    const handleAddFilter = (index: number) => {
      applyFilter({
        hexColourCode: hexCodes[index],
        elementRef: imgRef.current,
      });

      const dots = divsRef.current;
      if (!dots?.length) return;

      const curr = dots[index];
      const prevIdx = index === 0 ? dots.length - 1 : index - 1;
      const prev = dots[prevIdx];

      if (curr) curr.style.transform = "scale(1.3)";
      if (prev) prev.style.transform = "scale(1)";
    };

    let index = 1;
    const timer = setInterval(() => {
      if (index >= hexCodes.length) index = 0;
      handleAddFilter(index);
      index++;
    }, 4000);

    return () => clearInterval(timer);
  }, [hexCodes.length, divsRef, imgRef]);
}
