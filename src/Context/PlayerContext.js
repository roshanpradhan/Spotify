import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [songsInPlaylist, setSongsInPlaylist] = useState();
  const [currentSong, setCurrentSong] = useState();
  const [themeColor, setThemeColor] = useState("#151515");
  return (
    <PlayerContext.Provider
      value={{
        selectedPlaylist,
        setSelectedPlaylist,
        currentSong,
        setCurrentSong,
        songsInPlaylist,
        setSongsInPlaylist,
        themeColor,
        setThemeColor,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
