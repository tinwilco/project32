import { useState } from "react";
import { Button } from "reactstrap";

import logo from "../assets/logo.png";
import ColleagueInterface from "./ColleagueInterface/ColleagueInterface";
import ManagerInterface from "./ManagerInterface/ManagerInterface";

import styles from "./App.module.css";

function App() {
  const [isManager, updateIsManager] = useState(false);

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
          {!isManager ? <ColleagueInterface /> : <ManagerInterface />}
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
