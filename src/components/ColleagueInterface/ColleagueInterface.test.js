import { render, screen, waitFor } from "@testing-library/react";
import MockDate from "mockdate";
import userEvent from "@testing-library/user-event";
import * as api from "../utils/api";

import ColleagueInterface from "./ColleagueInterface";

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

  it("matches the snapshot", () => {
    const subject = render(<ColleagueInterface darkMode="Dark_Mode__Class" />);
    expect(subject.baseElement).toMatchSnapshot();
  });

  it("shows the help text only when a mood is not selected", () => {
    render(<ColleagueInterface darkMode="Dark_Mode__Class" />);
    expect(
      screen.queryByText("Please select from the options below")
    ).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("ecstatic"));
    expect(
      screen.queryByText("Please select from the options below")
    ).not.toBeInTheDocument();
  });

  it("disables the Submit button until both a mood is selected and a name is entered", () => {
    render(<ColleagueInterface darkMode="Dark_Mode__Class" />);
    expect(screen.getByText("Submit").closest("button")).toBeDisabled();
    userEvent.click(screen.getByLabelText("ecstatic"));
    expect(screen.getByText("Submit").closest("button")).toBeDisabled();
    userEvent.type(screen.getByLabelText("Who are you?"), "tester");
    expect(screen.getByText("Submit").closest("button")).toBeEnabled();
  });

  it("displays a loading spinner while request is pending, removes it when complete", async () => {
    api.SendRecord.mockResolvedValue({ status: 200 });
    render(<ColleagueInterface darkMode="Dark_Mode__Class" />);
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
    api.SendRecord.mockResolvedValue({ status: 200 });
    render(<ColleagueInterface darkMode="Dark_Mode__Class" />);
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
    api.SendRecord.mockResolvedValue({
      status: 500,
      error: "testing error scenario"
    });
    render(<ColleagueInterface darkMode="Dark_Mode__Class" />);
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
