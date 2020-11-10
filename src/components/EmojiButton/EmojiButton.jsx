import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/bind";

import styles from "./EmojiButton.module.css";

const cx = classnames.bind(styles);

const EmojiButton = ({
  label,
  emoji,
  handleButtonPress,
  disabled,
  selected
}) => (
  <button
    className={cx({ EmojiButton: true, EmojiButton_selected: selected })}
    type="button"
    onClick={() => handleButtonPress(label)}
    disabled={disabled}
  >
    <span role="img" aria-label={label}>
      {emoji}
    </span>
  </button>
);

EmojiButton.propTypes = {
  label: PropTypes.string.isRequired,
  handleButtonPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  emoji: PropTypes.string.isRequired,
  selected: PropTypes.bool
};

EmojiButton.defaultProps = {
  disabled: false,
  selected: false
};

export default EmojiButton;
