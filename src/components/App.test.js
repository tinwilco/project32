import React from "react";

import { render } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders to match the snapshot", () => {
    const subject = render(<App />);
    expect(subject.baseElement).toMatchSnapshot();
  });
});
