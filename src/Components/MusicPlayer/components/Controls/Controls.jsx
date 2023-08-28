import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import "./Controls.scss";
import images from "../../../../assets/Images/Images";
import { PlayerContext } from "../../../../Context/PlayerContext";

const Controls = ({ audioRef, progressBarRef, setTimeProgress, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [muteVolume, setMuteVolume] = useState(false);
  const { currentSong, setCurrentSong, songsInPlaylist } =
    useContext(PlayerContext);

  const nextSong = () => {
    if (songsInPlaylist) {
      const index = songsInPlaylist.findIndex((item) => {
        return currentSong["_id"] === item["_id"];
      });
      if (index !== -1) {
        if (index <= songsInPlaylist?.length - 1) {
          if (index == songsInPlaylist?.length - 1) {
            setCurrentSong(songsInPlaylist[0]);
          } else {
            setCurrentSong(songsInPlaylist[index + 1]);
          }
        }
      } else {
        setCurrentSong(songsInPlaylist[0]);
      }
    }
  };
  const prevSong = () => {
    if (songsInPlaylist) {
      const index = songsInPlaylist.findIndex((item) => {
        return currentSong["_id"] === item["_id"];
      });
      if (index !== -1) {
        if (index <= songsInPlaylist.length - 1) {
          if (index == 0) {
            setCurrentSong(songsInPlaylist[songsInPlaylist.length - 1]);
          } else {
            setCurrentSong(songsInPlaylist[index - 1]);
          }
        }
      } else {
        setCurrentSong(songsInPlaylist[0]);
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    setTimeProgress(0);
    progressBarRef.current.value = 0;
  }, [currentSong]);

  const playAnimationRef = useRef();
  const repeat = useCallback(() => {
    var currentTime;
    if (audioRef.current) {
      currentTime = audioRef?.current.currentTime;
    }
    setTimeProgress(currentTime ?? 0);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);
  return (
    <div className="controls">
      <div>
        <button className="optionButton">
          <img src={images.vector} />
        </button>
      </div>
      <div className="playPause">
        <img
          className="previousBtn"
          src={images.previous}
          onClick={() => {
            prevSong();
          }}
        />
        <button className="startStop" onClick={togglePlayPause}>
          {isPlaying ? (
            <img style={{ width: "20px", height: "20px" }} src={images.pause} />
          ) : (
            <img src={images.play} />
          )}
        </button>
        <img
          className="nextBtn"
          src={images.next}
          onClick={() => {
            nextSong();
          }}
        />
      </div>
      <div>
        <button
          className="optionButton"
          onClick={() => setMuteVolume((prev) => !prev)}
        >
          <img
            style={{ height: "20px", width: "20px" }}
            src={!muteVolume ? images.volume : images.mute}
          />
        </button>
      </div>
    </div>
  );
};

export default Controls;
