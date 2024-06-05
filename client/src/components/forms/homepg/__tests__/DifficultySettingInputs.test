import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import DifficultySettingInputs from "../DifficultySettingInputs";
import { MemoryRouter } from "react-router-dom";

interface PropType {
  index: number;
  setting: string;
  title: string;
  isSelectable: boolean;
  customSettingsChecked: string[];
  setCustomSettingsChecked: (value: string[]) => void;
}

const mockDifficultySettingInputs = (props: PropType) => {
  render(
    <MemoryRouter>
      <DifficultySettingInputs {...props} />
    </MemoryRouter>,
  );
};

const props = {
  setting: "Difficulty Setting",
  title: "Difficulty Title",
  isSelectable: false,
  setCustomSettingsChecked: vi.fn(),
  customSettingsChecked: ["custom_setting_1", "custom_setting_2"],
  index: 0,
};

describe("renders all form elements", () => {
  beforeEach(() => {
    mockDifficultySettingInputs(props);
  });

  it("should render an appropriate title", () => {
    const textElement = screen.getByTitle(props.title);
    expect(textElement).toBeInTheDocument();
  });

  it("should render an appropriate settings to filter text", () => {
    const textElement = screen.getByText(props.setting);
    expect(textElement).toBeInTheDocument();
  });
});

describe("user events", () => {
  it("should set selected setting when user clicks on a setting that is selectable", async () => {
    mockDifficultySettingInputs({ ...props, isSelectable: true });

    const divElement = screen.getByTitle(props.title);
    expect(divElement).toBeInTheDocument();

    fireEvent.click(divElement);

    await waitFor(() =>
      expect(props.setCustomSettingsChecked).toHaveBeenCalledOnce(),
    );
  });

  it("should not set selected setting when user clicks on a setting that is not selectable", async () => {
    mockDifficultySettingInputs(props);

    const divElement = screen.getByTitle(props.title);
    expect(divElement).toBeInTheDocument();

    fireEvent.click(divElement);

    await waitFor(() =>
      expect(props.setCustomSettingsChecked).toHaveBeenCalledOnce(),
    );
  });
});
