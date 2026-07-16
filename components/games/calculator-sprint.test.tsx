import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CalculatorSprint } from "@/components/games/calculator-sprint";

describe("CalculatorSprint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts the complete expression from a physical keyboard and advances once", () => {
    render(<CalculatorSprint />);
    const input = screen.getByLabelText("Calculator typing input");
    typeCurrentTarget(input);

    expect(screen.getByText("Score: 20")).toBeInTheDocument();
    expect(screen.getByText("Rounds: 1/5")).toBeInTheDocument();
    fireEvent.keyDown(input, { key: "Enter", repeat: true });
    expect(screen.getByText("Score: 20")).toBeInTheDocument();
  });

  it("gives the on-screen calculator the same valid completion path", () => {
    render(<CalculatorSprint />);
    const target = currentTarget();

    for (const key of target) {
      const label = key === "\n" ? "Submit" : key;
      fireEvent.click(screen.getAllByRole("button", { name: label })[0]);
    }

    expect(screen.getByText("Score: 20")).toBeInTheDocument();
    expect(screen.getByText("Rounds: 1/5")).toBeInTheDocument();
  });

  it("uses corrected error history when scoring a completed round", () => {
    render(<CalculatorSprint />);
    const input = screen.getByLabelText("Calculator typing input");
    const target = currentTarget();
    const wrongKey = target[0] === "0" ? "1" : "0";

    fireEvent.keyDown(input, { key: wrongKey });
    fireEvent.keyDown(input, { key: "Backspace" });
    typeTarget(input, target);

    expect(screen.getByText("Score: 10")).toBeInTheDocument();
    expect(screen.getByText("Rounds: 1/5")).toBeInTheDocument();
  });

  it("ends once at zero lives and ignores further scoring input", () => {
    render(<CalculatorSprint />);
    const input = screen.getByLabelText("Calculator typing input");
    const target = currentTarget();

    for (let index = 0; index < 4; index += 1) {
      fireEvent.keyDown(input, { key: target[index] === "0" ? "1" : "0" });
    }

    expect(screen.getByText("Game over")).toBeInTheDocument();
    expect(screen.getByLabelText("0 lives remaining")).toHaveTextContent("No lives");
    fireEvent.keyDown(input, { key: "1" });
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
  });

  it("has an attainable five-round completion state", () => {
    render(<CalculatorSprint />);
    const input = screen.getByLabelText("Calculator typing input");

    for (let round = 0; round < 5; round += 1) {
      typeCurrentTarget(input);
    }

    expect(screen.getByText("Sprint complete")).toBeInTheDocument();
    expect(screen.getByText("Rounds: 5/5")).toBeInTheDocument();
    expect(screen.getByText("Score: 100")).toBeInTheDocument();
  });

  it("restarts cleanly while preserving the selected difficulty", () => {
    render(<CalculatorSprint />);
    const input = screen.getByLabelText("Calculator typing input");
    fireEvent.click(screen.getByRole("button", { name: "medium" }));
    expect(screen.getByRole("button", { name: "hard" })).toBeInTheDocument();

    typeCurrentTarget(input);
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));

    expect(screen.getByRole("button", { name: "hard" })).toBeInTheDocument();
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
    expect(screen.getByText("Rounds: 0/5")).toBeInTheDocument();
    expect(screen.getByLabelText("4 lives remaining")).toBeInTheDocument();
  });

  it("rejects paste, composition, shortcuts, and repeated keys", () => {
    render(<CalculatorSprint />);
    const input = screen.getByLabelText("Calculator typing input");
    fireEvent.paste(input, { clipboardData: { getData: () => "36+5" } });
    fireEvent.keyDown(input, { key: "3", isComposing: true });
    fireEvent.keyDown(input, { key: "3", ctrlKey: true });
    fireEvent.keyDown(input, { key: "3", repeat: true });

    expect(screen.getByText("Start typing")).toBeInTheDocument();
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
  });

  it("focuses and recovers the calculator typing target", async () => {
    render(<CalculatorSprint />);
    const input = screen.getByLabelText("Calculator typing input");
    await waitFor(() => expect(input).toHaveFocus());
    fireEvent.blur(input);
    fireEvent.click(screen.getByTestId("calculator-target").parentElement?.parentElement as HTMLElement);
    expect(input).toHaveFocus();
  });
});

function currentTarget() {
  return screen.getByTestId("calculator-target").getAttribute("data-target") ?? "";
}

function typeCurrentTarget(input: HTMLElement) {
  typeTarget(input, currentTarget());
}

function typeTarget(input: HTMLElement, target: string) {
  for (const key of target) {
    fireEvent.keyDown(input, { key: key === "\n" ? "Enter" : key });
  }
}
