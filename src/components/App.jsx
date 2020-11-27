import { useState, useEffect } from "react";
import { Button } from "reactstrap";

import logo from "../assets/logo.png";
import ColleagueInterface from "./ColleagueInterface/ColleagueInterface";
import ManagerInterface from "./ManagerInterface/ManagerInterface";

import styles from "./App.module.css";
import { Authenticate } from "./utils/api";

function App() {
  const [isManager, updateIsManager] = useState(false);
  const [idToken, updateIdToken] = useState(null);

  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const token = await Authenticate(code);
    updateIdToken(token);
  }, []);

  let content = <div>Loading</div>;

  if (idToken !== null) {
    content = !isManager ? (
      <ColleagueInterface idToken={idToken} />
    ) : (
      <ManagerInterface />
    );
  }

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
          {content}
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
