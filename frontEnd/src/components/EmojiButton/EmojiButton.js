import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/bind";

import styles from "./EmojiButton.module.css";

const cx = classnames.bind(styles);

const EmojiButton = ({
  label,
  handleButtonPress,
  disabled,
  color,
  selected
}) => {
  return (
    <button
      className={cx({ EmojiButton: true, EmojiButton_selected: selected })}
      type="button"
      onClick={handleButtonPress}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

EmojiButton.propTypes = {
  label: PropTypes.string.isRequired,
  handleButtonPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  selected: PropTypes.bool
};

EmojiButton.defaultProps = {
  disabled: false,
  selected: false,
  color: "lightgrey"
};

export default EmojiButton;
