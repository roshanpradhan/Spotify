import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ audioRef, progressBarRef }) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };
  return (
    <div className="progressBar">
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
    </div>
  );
};

export default ProgressBar;
