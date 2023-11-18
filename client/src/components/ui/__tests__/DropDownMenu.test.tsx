import { describe, it } from "vitest";
// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
// import DropDownMenu from "../DropDownMenu";

// const menuData = [
//   {
//     difficulty: "Very Easy",
//     customStyle: "text-green-200",
//     selected: false,
//   },
//   {
//     difficulty: "Easy",
//     customStyle: "text-green-400",
//     selected: false,
//   },
//   {
//     difficulty: "Medium",
//     customStyle: "text-green-600",
//     selected: true,
//   },
//   {
//     difficulty: "Hard",
//     customStyle: "text-red-400",
//     selected: false,
//   },
//   {
//     difficulty: "Very Hard",
//     customStyle: "text-red-600",
//     selected: false,
//   },
// ];

// const iconName = "boxingGlove";
// const labelText = "Display this label:";
// const setMenuData = vi.fn();
// const setShowDifficultyMenu = vi.fn();
// const showSettingsBtn = true;

// beforeEach(() => {
//   render(
//     <DropDownMenu
//       menuData={menuData}
//       setMenuData={setMenuData}
//       setShowDifficultyMenu={setShowDifficultyMenu}
//       iconName={iconName}
//       labelText={labelText}
//       showSettingsBtn={showSettingsBtn}
//     />
//   );
// });

// describe("renders all elements", () => {
//   it("should render a correct list", () => {
//     const listElement = screen.getByRole("list");
//     expect(listElement).toBeInTheDocument();
//   });

//   it("should render 5 list items", () => {
//     const listElements = screen.getAllByRole("listitem");
//     expect(listElements).toHaveLength(5);
//   });

//   it("should render 8 icons", () => {
//     const iconElements = screen.getAllByTitle(/icon/i);
//     expect(iconElements).toHaveLength(8);
//   });

//   it("should render a settings button", () => {
//     const iconElements = screen.getByRole("button");
//     expect(iconElements).toBeInTheDocument();
//   });

//   menuData.forEach((data) => {
//     if (data.selected !== true) {
//       it("should render correct text for", () => {
//         const textElement = screen.getByText(data.difficulty);
//         expect(textElement).toBeInTheDocument();
//       });
//     } else {
//       it("should render correct text for label and drop-down list", () => {
//         const textElements = screen.getAllByText(data.difficulty);
//         expect(textElements).toHaveLength(2);
//       });
//     }
//   });
// });

// describe("should not render", () => {
//   it("should not render settings menu modal", () => {
//     const divElement = screen.queryByTestId(/modal-backdrop/i);
//     expect(divElement).not.toBeInTheDocument();
//   });
// });

// describe("user event", () => {
//   it("should call function to update selected label option when each label option is clicked", async () => {
//     const listElements = screen.getAllByRole("listitem");

//     listElements.forEach((listElement) => {
//       fireEvent.click(listElement);
//       expect(setMenuData).toHaveBeenCalled();
//     });
//   });

//   it("should call difficulty settings menu when settings button is clicked", async () => {
//     const divElement = screen.queryByTestId(/modal-backdrop/i);
//     expect(divElement).not.toBeInTheDocument();

//     const btnElement = screen.getByRole("button");

//     fireEvent.click(btnElement);

//     await waitFor(() => {
//       expect(setShowDifficultyMenu).toHaveBeenCalled();
//     });
//   });
// });

describe("should do stuff", () => {
  it("should do stuff", () => {});
});
