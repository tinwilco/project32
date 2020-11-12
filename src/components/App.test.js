import React from "react";
import { render } from "@testing-library/react";
import MockDate from "mockdate";

import App from "./App";

describe("App component", () => {
  beforeAll(() => {
    MockDate.set("2020-01-01");
  });
  afterAll(() => {
    MockDate.reset();
  });
  it("renders to match the snapshot", () => {
    const subject = render(<App />);
    expect(subject.baseElement).toMatchSnapshot();
  });
});
