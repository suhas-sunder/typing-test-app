import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import CapitalizeOddChars from "../CapitalizeOddChars";

describe("renders all page elements", () => {
  it("should render nav bar and footer with logo link", () => {
    const word = "hello";
    let lengthToCapatilize = 1;
    let capitalizedWord = CapitalizeOddChars({ word, lengthToCapatilize });
    expect(capitalizedWord).toEqual("Hello");

    lengthToCapatilize = 2;
    capitalizedWord = CapitalizeOddChars({ word, lengthToCapatilize });
    expect(capitalizedWord).toEqual("HeLlo");

    lengthToCapatilize = 3;
    capitalizedWord = CapitalizeOddChars({ word, lengthToCapatilize });
    expect(capitalizedWord).toEqual("HeLlo");

    lengthToCapatilize = 4;
    capitalizedWord = CapitalizeOddChars({ word, lengthToCapatilize });
    expect(capitalizedWord).toEqual("HeLlO");
  });
});
