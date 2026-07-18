import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AdPlacement, AdSidebarPair } from "@/components/ads/ad-placement";
import { AdRuntimeProvider } from "@/components/ads/ad-runtime";

function renderPlacement(
  placement: "above_header" | "below_header_or_tool" | "main_content_rectangle" | "bottom_page",
  placeholderState: "placeholder" | "filled" | "unfilled" | "blocked" = "placeholder",
) {
  return render(
    <AdRuntimeProvider mode="placeholder" placeholderState={placeholderState} routeFamily="home">
      <AdPlacement placement={placement} />
    </AdRuntimeProvider>,
  );
}

describe("stable advertisement reservations", () => {
  it("renders the neutral placeholder and ins as non-nested siblings", () => {
    renderPlacement("below_header_or_tool");
    const placeholder = screen.getByText("Advertisement");
    const reservation = placeholder.parentElement!;
    const ad = reservation.querySelector("ins");
    expect(placeholder).toHaveAttribute("aria-hidden", "true");
    expect(placeholder).not.toHaveAttribute("tabindex");
    expect(placeholder).toHaveClass("ad-placeholder");
    expect(ad).not.toBeNull();
    expect(placeholder.nextElementSibling).toBe(ad);
    expect(placeholder.querySelector("ins")).toBeNull();
    expect(ad).toHaveAttribute("data-ad-slot", "4805532285");
    expect(ad).toHaveAttribute("data-ad-format", "horizontal");
  });

  it("uses the fixed above-header tag without auto or full-width responsive attributes", () => {
    renderPlacement("above_header");
    const ad = document.querySelector("ins")!;
    expect(ad).toHaveAttribute("data-ad-slot", "9403252845");
    expect(ad).not.toHaveAttribute("data-ad-format");
    expect(ad).not.toHaveAttribute("data-full-width-responsive");
    expect(ad.parentElement).toHaveClass("ad-reservation--above_header");
  });

  it("uses rectangle and bottom shapes from the registry", () => {
    const { unmount } = renderPlacement("main_content_rectangle");
    expect(document.querySelector("ins")).toHaveAttribute("data-ad-format", "rectangle");
    expect(document.querySelector("ins")).toHaveAttribute("data-ad-slot", "1370372660");
    unmount();
    renderPlacement("bottom_page");
    expect(document.querySelector("ins")).toHaveAttribute("data-ad-format", "horizontal");
    expect(document.querySelector("ins")).toHaveAttribute("data-ad-slot", "5324407034");
  });

  it("hides only the placeholder for a filled simulation and retains it for unfilled or blocked simulations", () => {
    const { unmount } = renderPlacement("below_header_or_tool", "filled");
    expect(screen.getByText("Advertisement")).toHaveAttribute("data-hidden", "true");
    expect(screen.getByText("Advertisement").parentElement).toHaveClass("ad-reservation");
    unmount();
    renderPlacement("below_header_or_tool", "unfilled");
    expect(screen.getByText("Advertisement")).toHaveAttribute("data-hidden", "false");
  });

  it("renders balanced sidebars together with the exact vertical slots", () => {
    render(
      <AdRuntimeProvider mode="placeholder" placeholderState="blocked" routeFamily="home">
        <AdSidebarPair />
      </AdRuntimeProvider>,
    );
    const pair = document.querySelector("[data-ad-sidebar-pair]")!;
    const ads = pair.querySelectorAll("ins");
    expect(ads).toHaveLength(2);
    expect(ads[0]).toHaveAttribute("data-ad-slot", "2837844497");
    expect(ads[1]).toHaveAttribute("data-ad-slot", "6486967973");
    expect(ads[0]).toHaveAttribute("data-ad-format", "vertical");
    expect(ads[1]).toHaveAttribute("data-ad-format", "vertical");
  });

  it("leaves no reservation on off or suppressed routes", () => {
    const { rerender } = render(
      <AdRuntimeProvider mode="off" placeholderState="placeholder" routeFamily="home">
        <AdPlacement placement="bottom_page" />
      </AdRuntimeProvider>,
    );
    expect(document.querySelector("[data-ad-reservation]")).toBeNull();
    rerender(
      <AdRuntimeProvider mode="placeholder" placeholderState="placeholder" routeFamily="progress">
        <AdPlacement placement="bottom_page" />
      </AdRuntimeProvider>,
    );
    expect(document.querySelector("[data-ad-reservation]")).toBeNull();
  });
});

