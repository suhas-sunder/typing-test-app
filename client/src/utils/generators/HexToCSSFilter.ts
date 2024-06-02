import { hexToCSSFilter } from "hex-to-css-filter";

interface PropType {
  hexColourCode: string;
  elementRef: HTMLDivElement | null;
}

export default function HexToCSSFilter({
  hexColourCode,
  elementRef,
}: PropType) {
  const cssFilter = hexToCSSFilter(hexColourCode);

  const filter = cssFilter.filter.split(";").join("");

  if (elementRef) elementRef.style.filter = filter;
}
