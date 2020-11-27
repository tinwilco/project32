import "jest-canvas-mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

jest.mock("./ColleagueInterface/ColleagueInterface");

jest.mock("./ManagerInterface/ManagerInterface");

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("App component", () => {
  it("renders Colleague interface by default", () => {
    render(<App />);
    expect(screen.queryByText("ColleagueInterface")).toBeInTheDocument();
    expect(screen.queryByText("ManagerInterface")).not.toBeInTheDocument();
  });

  it("toggles between interfaces when button pressed", () => {
    render(<App />);
    expect(screen.queryByText("ColleagueInterface")).toBeInTheDocument();
    expect(screen.queryByText("ManagerInterface")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("ColleagueInterface")).not.toBeInTheDocument();
    expect(screen.queryByText("ManagerInterface")).toBeInTheDocument();
    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("ColleagueInterface")).toBeInTheDocument();
    expect(screen.queryByText("ManagerInterface")).not.toBeInTheDocument();
  });
});
