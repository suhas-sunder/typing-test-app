import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import ManipulateString from "../ManipulateString";

describe("return correct value", () => {
  it("should remove whitespaces from string", () => {
    const textToBeManipulated = "hello world";
    const option = "no whitespace";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("helloworld");
  });

  it("should return all lower case", () => {
    const textToBeManipulated = "HELLO World";
    const option = "all lower case";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("hello world");
  });

  it("should return all upper case", () => {
    const textToBeManipulated = "HELLO World";
    const option = "ALL UPPER CASE";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("HELLO WORLD");
  });

  it("should remove all punctuation", () => {
    const textToBeManipulated = "hello_world?!#$!$%@^^&&^%**()[]{}";
    const option = "no punctuation";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("helloworld");
  });

  // Test this when implemented
  // it("should remove all punctuation", () => {
  //   const textToBeManipulated = "hello_world?!#$!$%@^^&&^%**()[]{}";
  //   const option = "P.u?n!c't+u*a~t>e^d";
  //   const newText = ManipulateString({ textToBeManipulated, option });
  //   expect(newText).toEqual("helloworld");
  // });

  // Fix this text once I fix logic. Then add tests for the rest of the conversions.
  it("should return pascal case", () => {
    const textToBeManipulated = "hello";
    const option = "PascalCase";
    const newText = ManipulateString({ textToBeManipulated, option });
    expect(newText).toEqual("HelloHelloHelloHello");
  });
});
