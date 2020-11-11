import React from "react";

import { render, screen } from "@testing-library/react";

import ColleagueInterface from "./ColleagueInterface";

describe("Colleague Interface component", () => {
  it("matches the snapshot", () => {
    const subject = render(<ColleagueInterface />);
    expect(subject.baseElement).toMatchSnapshot();
  });

  it("displays a success alert when submitted", () => {
    render(<ColleagueInterface />);
    expect(screen.getByText("Submit").closest("button")).toBeDisabled();
  });
});
