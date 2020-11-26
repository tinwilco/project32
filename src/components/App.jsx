import { useState } from "react";
import { Button } from "reactstrap";
import { useMediaPredicate } from "react-media-hook";
import classnames from "classnames/bind";

import logo from "../assets/logo.png";
import ColleagueInterface from "./ColleagueInterface/ColleagueInterface";
import ManagerInterface from "./ManagerInterface/ManagerInterface";

import styles from "./App.module.css";

const cx = classnames.bind(styles);

function App() {
  const [isManager, updateIsManager] = useState(false);

  const [useDarkMode] = useState(
    useMediaPredicate("(prefers-color-scheme: dark)")
  );

  return (
    <div
      className={cx({ App, App_Dark: useDarkMode, App_Light: !useDarkMode })}
    >
      <div className={styles.App_Background}>
        <div className={styles.App_Container}>
          <img
            className={styles.Logo}
            src={logo}
            alt="Hedwig Logo"
            title="Hedwig Logo"
          />
          {!isManager ? <ColleagueInterface /> : <ManagerInterface />}
        </div>
        <Button
          color="link"
          onClick={() => updateIsManager(!isManager)}
          className={styles.Switch_Mode__Button}
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
