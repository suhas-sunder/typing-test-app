import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteNav } from "@/components/site-nav";

describe("SiteNav without accounts", () => {
  it("links to local progress and has no account actions", () => {
    render(<SiteNav />);
    expect(screen.getAllByRole("link", { name: "Progress" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: /sign in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /sign up/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /dashboard/i })).not.toBeInTheDocument();
  });

  it("keeps the mobile progress action available", () => {
    render(<SiteNav />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getAllByRole("link", { name: "Progress" })).toHaveLength(2);
  });
});

