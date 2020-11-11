import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "reactstrap";

import EmojiButton from "../EmojiButton/EmojiButton";
import UsernameEntry from "../UsernameEntry/UsernameEntry";

import styles from "./ColleagueInterface.module.css";

import { buttons as emojiButtonArray } from "../../assets/emojiButtons.json";

const ColleagueInterface = () => {
  const selectedDate = useMemo(() => new Date(), []);

  const [selectedMood, updateSelectedMood] = useState(null);
  const [username, updateUsername] = useState("");

  const handleSubmit = () => {
    console.log({ mood: selectedMood, date: selectedDate, name: username });
  };

  return (
    <>
      <h3>{format(selectedDate, "EEEE dd/MM/yyyy")}</h3>
      {!selectedMood && (
        <p className={styles.helpText}>Please select from the options below</p>
      )}
      <div className={styles.App_Button_Container}>
        {emojiButtonArray.map(button => (
          <EmojiButton
            label={button.label}
            emoji={button.emoji}
            key={`emoji-button-${button.label}`}
            handleButtonPress={() => updateSelectedMood(button.label)}
            selected={selectedMood === button.label}
          />
        ))}
      </div>
      <UsernameEntry
        handleUpdateUsername={value => updateUsername(value)}
        username={username}
      />
      <Button
        color="primary"
        size="lg"
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={!username || !selectedMood}
      >
        Submit
      </Button>
    </>
  );
};

export default ColleagueInterface;
