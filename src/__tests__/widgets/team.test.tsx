import { render, screen } from "@testing-library/react";
import Team from "~/components/widgets/Team";

describe("Team", () => {
  const baseProps = {
    id: "team-section",
    hasBackground: false,
    header: { title: "Our Team", subtitle: "Meet the experts" },
    teams: [
      {
        name: "Alice",
        occupation: "Designer",
        image: "/img1.jpg",
        items: [],
      },
      {
        name: "Bob",
        occupation: "Engineer",
        image: "/img2.jpg",
        items: [],
      },
    ],
  };

  test("renders Headline when header is provided", () => {
    render(<Team {...baseProps} />);

    expect(screen.getByTestId("mock-headline")).toHaveTextContent("Our Team");
  });

  test("does not render Headline when header is missing", () => {
    const { queryByTestId } = render(
      <Team {...baseProps} header={undefined} />
    );

    expect(queryByTestId("mock-headline")).toBeNull();
  });

  test("renders correct number of ItemTeam components", () => {
    render(<Team {...baseProps} />);

    const items = screen.getAllByTestId("mock-itemteam");
    expect(items.length).toBe(2);
  });

  test("passes correct props to ItemTeam mock", () => {
    render(<Team {...baseProps} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Designer")).toBeInTheDocument();

    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
  });

  test("passes id correctly to WidgetWrapper", () => {
    const { container } = render(<Team {...baseProps} />);
    expect(container.querySelector("#team-section")).toBeInTheDocument();
  });

  test("renders empty id when none provided", () => {
    const { container } = render(<Team {...baseProps} id={undefined} />);
    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(<Team {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
