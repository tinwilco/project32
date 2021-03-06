import { Input, Label } from "reactstrap";
import PropTypes from "prop-types";

import styles from "./UsernameEntry.module.css";

const UsernameEntry = ({ handleUpdateUsername, username }) => (
  <>
    <Label for="usernameInputTextBox">Who are you?</Label>
    <Input
      id="usernameInputTextBox"
      className={styles.UsernameEntry}
      type="text"
      value={username}
      onChange={e => handleUpdateUsername(e.target.value)}
      placeholder="Enter your name"
      bsSize="lg"
    />
  </>
);

UsernameEntry.propTypes = {
  handleUpdateUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default UsernameEntry;
