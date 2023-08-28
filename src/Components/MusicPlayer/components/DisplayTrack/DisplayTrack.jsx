import React, { useContext } from "react";
import "./DisplayTrack.scss";
import { PlayerContext } from "../../../../Context/PlayerContext";
import Color from "color-thief-react";

const DisplayTrack = ({ audioRef, progressBarRef, setDuration }) => {
  const {
    setSelectedPlaylist,
    selectedPlaylist,
    currentSong,
    setCurrentSong,
    themeColor,
    setThemeColor,
  } = useContext(PlayerContext);
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  return (
    <div className="displayTrack">
      <Color src={currentSong?.photo} crossOrigin="anonymous" format="hex">
        {({ data, loading }) => {
          if (loading) setThemeColor(themeColor);
          if (data !== undefined) setThemeColor(data);
        }}
      </Color>
      <audio
        src={currentSong?.url}
        ref={audioRef}
        onLoadedMetadata={() => {
          onLoadedMetadata();
        }}
      />
      <div className="description">
        <div className="title">{currentSong?.title}</div>
        <div className="author">{currentSong?.artist}</div>
      </div>
      <div className="trackImage">
        <img src={currentSong?.photo} />
      </div>
    </div>
  );
};

export default DisplayTrack;
