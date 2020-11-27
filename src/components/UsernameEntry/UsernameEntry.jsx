import { Input, Label } from "reactstrap";
import PropTypes from "prop-types";

import styles from "./UsernameEntry.module.css";
import lightstyles from "../LightApp.module.css";

const UsernameEntry = ({ handleUpdateUsername, username, darkMode }) => (
  <>
    <Label
      className={darkMode ? styles.TextBackground : lightstyles.TextBackground}
      for="usernameInputTextBox"
    >
      Who are you?
    </Label>
    <Input
      id="usernameInputTextBox"
      className={styles.UsernameEntry}
      type="text"
      value={username}
      onChange={(e) => handleUpdateUsername(e.target.value)}
      placeholder="Enter your name"
      bsSize="lg"
    />
  </>
);

UsernameEntry.propTypes = {
  handleUpdateUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  darkMode: PropTypes.string.isRequired,
};

UsernameEntry.defaultProps = {
  darkMode: "",
};

export default UsernameEntry;
