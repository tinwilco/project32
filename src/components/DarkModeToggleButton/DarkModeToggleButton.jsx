import { useRef, useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
import Lottie from "lottie-react-web";

import animationData from "./DarkModeToggleButton.AnimationData.json";

import styles from "./DarkModeToggleButton.module.css";

const options = Object.freeze({
  animationData,
  autoplay: false,
  loop: true
});

const DarkModeToggleButton = ({ checked, onChange, speed }) => {
  const ref = useRef();
  const [progress, setProgress] = useState(() => 0);
  const segments = checked ? { segments: [2, 96] } : null;

  useEffect(() => {
    if (progress >= 0.5) {
      if (checked) {
        ref.current.anim.pause();
      } else if (ref.current.anim.isPaused) {
        ref.current.anim.play();
      }
    } else if (!checked) {
      ref.current.anim.pause();
    }
  }, [checked, progress]);

  useEffect(() => {
    if (checked) {
      ref.current.anim.setCurrentRawFrameValue(48);
    }
  }, []);

  const [eventListeners] = useState(() => [
    {
      eventName: "enterFrame",
      callback: ({ currentTime, totalTime }) =>
        setProgress(currentTime / totalTime)
    }
  ]);

  return (
    <button
      onClick={() => ref.current.anim.isPaused && onChange(!checked)}
      className={styles.Dark_Mode_Toggle_Button}
      type="button"
    >
      <div className={styles.Dark_Mode_Toggle_Button__Container}>
        <Lottie
          key="$preventGlitches"
          ref={ref}
          speed={speed}
          isClickToPauseDisabled
          eventListeners={eventListeners}
          forceSegments
          options={options}
          segments={(segments && segments.segments) || segments}
        />
      </div>
    </button>
  );
};

DarkModeToggleButton.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  speed: PropTypes.number
};

DarkModeToggleButton.defaultProps = {
  checked: false,
  speed: 1.3
};

export default memo(DarkModeToggleButton);
