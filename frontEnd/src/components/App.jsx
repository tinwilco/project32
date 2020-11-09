import React, { useState } from "react";

import EmojiButton from "./EmojiButton/EmojiButton";
import styles from "./App.module.css";

function App() {
  const handleButtonPress = label => {
    updateSelectedMood(label);
  };

  const emojiButtonArray = [
    { label: "🤠" },
    { label: "🤑" },
    { label: "🤧" },
    { label: "🥳" },
    { label: "😭" }
  ];

  const [selectedMood, updateSelectedMood] = useState("");

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <h2>How are you feeling today?</h2>
        <div className={styles.App_Button_Container}>
          {emojiButtonArray.map(button => {
            return (
              <EmojiButton
                label={button.label}
                key={`emoji-button-${button.label}`}
                handleButtonPress={() => handleButtonPress(button.label)}
                selected={selectedMood === button.label}
              />
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
