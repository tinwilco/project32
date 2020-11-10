import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { Button } from "reactstrap";

import EmojiButton from "./EmojiButton/EmojiButton";
import styles from "./App.module.css";
import logo from "../assets/logo.png";
import UsernameEntry from "./UsernameEntry/UsernameEntry";

function App() {
  const emojiButtonArray = [
    { emoji: "😢", label: "miserable" },
    { emoji: "🙁", label: "sad" },
    { emoji: "😑", label: "neutral" },
    { emoji: "🙂", label: "happy" },
    { emoji: "🥳", label: "ecstatic" }
  ];

  const selectedDate = useMemo(() => new Date(), []);

  const [selectedMood, updateSelectedMood] = useState(null);
  const [isManager, updateIsManager] = useState(false);
  const [username, updateUsername] = useState("");

  const handleSubmit = () => {
    console.log({ mood: selectedMood, date: selectedDate, name: username });
  };

  return (
    <div className={styles.App}>
      <div className={styles.App_background}>
        <div className={styles.App_container}>
          <img
            className={styles.logo}
            src={logo}
            alt="Hedwig Logo"
            title="Hedwig Logo"
          />
          <h2>How are you feeling today?</h2>
          {!isManager ? (
            <>
              <h3>{format(selectedDate, "EEEE dd/MM/yyyy")}</h3>
              {!selectedMood && (
                <p className={styles.helpText}>
                  Please select from the options below
                </p>
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
          ) : (
            <>
              <p>Manager Content Works!</p>
            </>
          )}
        </div>
        <Button
          color="link"
          onClick={() => updateIsManager(!isManager)}
          className={styles.SwitchModeButton}
        >
          {isManager
            ? "Return to Mood Entry"
            : "Manager? Click here to see team moods!"}
        </Button>
      </div>
    </div>
  );
}

export default App;
