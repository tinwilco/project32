import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MockDate from "mockdate";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import ColleagueInterface from "./ColleagueInterface";

jest.mock("axios");

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

  it("matches the snapshot", () => {
    const subject = render(<ColleagueInterface />);
    expect(subject.baseElement).toMatchSnapshot();
  });

  it("shows the help text only when a mood is not selected", () => {
    render(<ColleagueInterface />);
    expect(
      screen.queryByText("Please select from the options below")
    ).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("ecstatic"));
    expect(
      screen.queryByText("Please select from the options below")
    ).not.toBeInTheDocument();
  });

  it("disables the Submit button until both a mood is selected and a name is entered", () => {
    render(<ColleagueInterface />);
    expect(screen.getByText("Submit").closest("button")).toBeDisabled();
    userEvent.click(screen.getByLabelText("ecstatic"));
    expect(screen.getByText("Submit").closest("button")).toBeDisabled();
    userEvent.type(screen.getByLabelText("Who are you?"), "tester");
    expect(screen.getByText("Submit").closest("button")).toBeEnabled();
  });

  it("displays a loading spinner while request is pending, removes it when complete", async () => {
    axios.post.mockResolvedValue({ status: 200 });
    render(<ColleagueInterface />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByLabelText("ecstatic"));
    userEvent.type(screen.getByLabelText("Who are you?"), "tester");
    userEvent.click(screen.getByText("Submit").closest("button"));
    expect(screen.queryByRole("status")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("displays a success alert when request is successful", async () => {
    axios.post.mockResolvedValue({ status: 200 });
    render(<ColleagueInterface />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByLabelText("ecstatic"));
    userEvent.type(screen.getByLabelText("Who are you?"), "tester");
    userEvent.click(screen.getByText("Submit").closest("button"));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Thanks. Your mood has been recorded."
      );
    });
  });

  it("displays a failure alert when request is unsuccessful", async () => {
    axios.post.mockResolvedValue({ status: 500 });
    render(<ColleagueInterface />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByLabelText("ecstatic"));
    userEvent.type(screen.getByLabelText("Who are you?"), "tester");
    userEvent.click(screen.getByText("Submit").closest("button"));
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Sorry, your response could not be recorded at this time."
      );
    });
  });
});
