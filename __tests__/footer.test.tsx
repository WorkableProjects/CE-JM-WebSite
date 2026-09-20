import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders both tutors' full contact information", () => {
    render(<Footer />);
    expect(screen.getByText("Caden Erwin")).toBeInTheDocument();
    expect(screen.getByText("cerwin42451@beaumontusd.k12.ca.us")).toBeInTheDocument();
    expect(screen.getByText("Jayden McCarthy")).toBeInTheDocument();
    expect(screen.getByText("jmccarthy35750@beaumontusd.k12.ca.us")).toBeInTheDocument();
  });

  it("shows a non-empty build number in the technical metadata row", () => {
    render(<Footer />);
    expect(screen.getByText(/CE\/JM WEB/)).toBeInTheDocument();
    expect(screen.getByText(/BUILD\s+\S+/)).toBeInTheDocument();
  });

  it("links to Home, Staff, and Contact", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Staff" })).toHaveAttribute("href", "/staff");
    expect(screen.getByRole("link", { name: "Contact / Book" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
