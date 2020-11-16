/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import EmojiButton from "./EmojiButton";

const defaultProps = {
  label: "test",
  emoji: "🧪",
  handleButtonPress: jest.fn(),
  disabled: false,
  selected: false
};

describe("EmojiButton component", () => {
  it("renders to match the snapshot", () => {
    const subject = render(<EmojiButton {...defaultProps} />);
    expect(subject.baseElement).toMatchSnapshot();
  });
  it("correctly calls the handleButtonPress method when the button is clicked", () => {
    render(<EmojiButton {...defaultProps} />);
    expect(defaultProps.handleButtonPress).not.toHaveBeenCalled();
    userEvent.click(screen.getByText(defaultProps.emoji).closest("button"));
    expect(defaultProps.handleButtonPress.mock.calls[0][0]).toBe(
      defaultProps.label
    );
  });
});
