import { render, screen } from "@testing-library/react";
import Spinner from "~/components/widgets/spinner";

describe("Spinner", () => {
  test("renders the loader overlay", () => {
    const { container } = render(<Spinner />);

    const overlay = container.firstChild as HTMLElement;

    expect(overlay).toBeInTheDocument();
    expect(overlay.className).toContain("fixed");
    expect(overlay.className).toContain("inset-0");
  });

  test("renders an element with role='status'", () => {
    render(<Spinner />);

    const status = screen.getByRole("status");

    expect(status).toBeInTheDocument();
  });

  test("renders an SVG spinner inside the status role", () => {
    render(<Spinner />);

    const status = screen.getByRole("status");
    const svg = status.querySelector("svg");

    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 100 101");
  });

  test("includes screen-reader loading text", () => {
    render(<Spinner />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(<Spinner />);
    expect(container).toMatchSnapshot();
  });
});
