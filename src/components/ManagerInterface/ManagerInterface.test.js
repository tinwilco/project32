import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MockDate from "mockdate";
import * as api from "../utils/api";

import ManagerInterface from "./ManagerInterface";

jest.mock("../utils/api");

describe("Colleague Interface component", () => {
  beforeAll(() => {
    MockDate.set("2020-01-01");
  });
  afterAll(() => {
    MockDate.reset();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("displays an error message when requests fail ", async () => {
    api.RetrieveRecordsForLastSevenDays.mockResolvedValue({
      status: 500,
      error: "testing error scenario"
    });
    render(<ManagerInterface />);
    await waitFor(() => {
      screen.getByText(/no results match your query/i);
    });
  });

  it("displays a single cards, with the name and mood rendered correctly", async () => {
    api.RetrieveRecordsForLastSevenDays.mockResolvedValue([
      {
        date: "2020-01-01",
        moods: [
          {
            mood: "ecstatic",
            userName: "tester",
            moodDate: "2020-01-01",
            comments: "test comment"
          }
        ]
      }
    ]);
    render(<ManagerInterface />);
    await waitFor(() => {
      expect(screen.getByText(/01\/01\/2020/i)).toBeInTheDocument();
      expect(screen.getByText(/tester: ecstatic/i)).toBeInTheDocument();
    });
  });
});
