import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Alert, Button, Spinner } from "reactstrap";

import EmojiButton from "../EmojiButton/EmojiButton";
import UsernameEntry from "../UsernameEntry/UsernameEntry";

import styles from "./ColleagueInterface.module.css";

import { buttons as emojiButtonArray } from "../../assets/emojiButtons.json";
import { SendRecord } from "../utils/api";

const ColleagueInterface = () => {
  const selectedDate = useMemo(() => new Date(), []);

  const [selectedMood, updateSelectedMood] = useState(null);
  const [userName, updateUserName] = useState("");
  const [isLoading, updateIsloading] = useState(false);
  const [isSubmitted, updateIsSubmitted] = useState(false);
  const [isError, updateIsError] = useState(false);

  const handleSubmit = async () => {
    updateIsloading(true);

    const payload = {
      userName,
      mood: selectedMood,
      moodDate: format(selectedDate, "yyyy-MM-dd"),
      comment: ""
    };

    const response = await SendRecord(payload);

    if (response.status === 200) {
      updateIsloading(false);
      updateIsSubmitted(true);
      updateIsError(false);
    } else {
      updateIsloading(false);
      updateIsSubmitted(false);
      updateIsError(true);
    }
  };

  return (
    <>
      <h2>{`Hello ${userName}, How are you feeling today?`}</h2>

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
        handleUpdateUsername={value => updateUserName(value)}
        username={userName}
      />
      <Button
        color="primary"
        size="lg"
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={isLoading || isSubmitted || !userName || !selectedMood}
      >
        Submit
        {isLoading && (
          <Spinner className={styles.spinner} size="sm" color="light" />
        )}
      </Button>
      {isSubmitted && (
        <Alert color="success" className={styles.alert}>
          Thanks. Your mood has been recorded.
        </Alert>
      )}
      {isError && (
        <Alert color="danger" className={styles.alert}>
          Sorry, your response could not be recorded at this time.
        </Alert>
      )}
    </>
  );
};

export default ColleagueInterface;
