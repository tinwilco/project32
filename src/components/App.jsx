import { useState, useEffect } from "react";
import { Button } from "reactstrap";

import logo from "../assets/logo.png";
import ColleagueInterface from "./ColleagueInterface/ColleagueInterface";
import ManagerInterface from "./ManagerInterface/ManagerInterface";

import styles from "./App.module.css";
import { Authenticate } from "./utils/api";

function App() {
  const [isManager, updateIsManager] = useState(false);
  const [authStatus, updateAuthStatus] = useState({ type: "loading" });

  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code === null) {
      updateAuthStatus({ type: "no-code" });
      return;
    }
    try {
      const token = await Authenticate(code);
      updateAuthStatus({ type: "authenticated", token });
    } catch {
      updateAuthStatus({ type: "authentication-failed" });
    }
  }, []);

  let content = null;

  switch (authStatus.type) {
    case "authenticated":
      if (isManager) {
        content = <ManagerInterface />;
      } else {
        content = <ColleagueInterface idToken={authStatus.token} />;
      }
      break;
    case "no-code":
      content = <div>Please authenticate via Cognito</div>;
      break;
    case "authentication-failed":
      content = <div>Authentication failed. Please try again.</div>;
      break;
    case "loading":
    default:
      content = <div>Loading</div>;
      break;
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
