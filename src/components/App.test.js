import "jest-canvas-mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

jest.mock("./ColleagueInterface/ColleagueInterface");

jest.mock("./ManagerInterface/ManagerInterface");

describe("App component in light mode", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }))
    });
  });

  it("renders Colleague interface by default", () => {
    render(<App />);
    expect(screen.queryByText("ColleagueInterface")).toBeInTheDocument();
    expect(screen.queryByText("ManagerInterface")).not.toBeInTheDocument();
  });

  it("toggles between interfaces when button pressed", () => {
    render(<App />);
    expect(screen.queryByText("ColleagueInterface")).toBeInTheDocument();
    expect(screen.queryByText("ManagerInterface")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /mood/i }));
    expect(screen.queryByText("ColleagueInterface")).not.toBeInTheDocument();
    expect(screen.queryByText("ManagerInterface")).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /mood/i }));
    expect(screen.queryByText("ColleagueInterface")).toBeInTheDocument();
    expect(screen.queryByText("ManagerInterface")).not.toBeInTheDocument();
  });

  it("changes mode from light to dark", async () => {
    render(<App />);
    userEvent.click(screen.getByRole("button", { name: "" }));
    expect(screen.queryByText("Dark Mode")).toBeInTheDocument();
    expect(screen.queryByText("Light Mode")).not.toBeInTheDocument();
  });
});

describe("App component in dark mode", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }))
    });
  });

  it("changes mode from dark to light", async () => {
    render(<App />);
    userEvent.click(screen.getByRole("button", { name: "" }));
    expect(screen.queryByText("Dark Mode")).not.toBeInTheDocument();
    expect(screen.queryByText("Light Mode")).toBeInTheDocument();
  });
});
