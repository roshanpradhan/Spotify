import React, { useContext, useRef, useState } from "react";
import "./MusicPlayer.scss";
import DisplayTrack from "./components/DisplayTrack/DisplayTrack";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Controls from "./components/Controls/Controls";
import { PlayerContext } from "../../Context/PlayerContext";

const MusicPlayer = () => {
  const audioRef = useRef();
  const progressBarRef = useRef();
  const { currentSong } = useContext(PlayerContext);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  return (
    <div className="player">
      {!currentSong ? (
        <div className="selectSong">Please choose a song to begin playing</div>
      ) : (
        <>
          <div className="playerDisplay">
            <DisplayTrack
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              setDuration={setDuration}
            />
          </div>
          <div className="playerControl">
            <Controls
              audioRef={audioRef}
              duration={duration}
              progressBarRef={progressBarRef}
              setTimeProgress={setTimeProgress}
            />
          </div>
          <div className="playerProgress">
            <ProgressBar audioRef={audioRef} progressBarRef={progressBarRef} />
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
