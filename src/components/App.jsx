import React, { useState } from "react";
import { Button } from "reactstrap";

import logo from "../assets/logo_no_bg.png";
import ColleagueInterface from "./ColleagueInterface/ColleagueInterface";
import ManagerInterface from "./ManagerInterface/ManagerInterface";

import styles from "./App.module.css";
import lightstyles from "./LightApp.module.css";
import DarkModeToggleButton from "./DarkModeToggleButton/DarkModeToggleButton";

function getPrefColorScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const getInitialMode = () => {
  const isReturningUser = "mode" in localStorage;
  const savedMode = JSON.parse(localStorage.getItem("mode"));
  const userPrefersDark = getPrefColorScheme();

  if (isReturningUser) {
    return savedMode;
  }
  if (userPrefersDark) {
    return true;
  }
  return false;
};

function App() {
  const [isManager, updateIsManager] = useState(false);
  const [darkMode, setDarkMode] = React.useState(getInitialMode());
  React.useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={styles.App}>
      <div
        className={
          darkMode ? styles.App_background : lightstyles.App_background
        }
      >
        <div className={styles.App_container}>
          <DarkModeToggleButton onChange={setDarkMode} checked={darkMode} />
          <p
            className={
              darkMode ? styles.TextBackground : lightstyles.TextBackground
            }
          >
            {darkMode ? "Dark Mode" : "Light Mode"}
          </p>
          <img
            className={styles.logo}
            src={logo}
            alt="Hedwig Logo"
            title="Hedwig Logo"
          />
          {!isManager ? (
            <ColleagueInterface darkMode={darkMode} />
          ) : (
            <ManagerInterface darkMode={darkMode} />
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
