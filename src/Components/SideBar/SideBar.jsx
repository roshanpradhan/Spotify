import React, { useState, useEffect, useContext } from "react";
import "./SideBar.scss";
import images from "../../assets/Images/Images";
import { PLAYLIST, SONG_LIST } from "../../graphql-query/Query";
import { useQuery } from "@apollo/client";
import { PlayerContext } from "../../Context/PlayerContext";

const SideBar = () => {
  const [active, setActive] = useState();
  const [songSelected, setSongSelected] = useState();
  const [songList, setSongList] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    setSelectedPlaylist,
    selectedPlaylist,
    currentSong,
    setCurrentSong,
    songsInPlaylist,
    setSongsInPlaylist,
  } = useContext(PlayerContext);
  const { loading, error, data } = useQuery(PLAYLIST);
  const {
    loading: loadingSong,
    error: errorSong,
    data: dataSong,
  } = useQuery(SONG_LIST, {
    variables: { playlistId: selectedPlaylist?.id },
  });

  const search = (val) => {
    if (val.length > 0) {
      const query = val.toString().toLowerCase();
      const result = dataSong?.getSongs.filter((item) => {
        if (
          item["title"].toString().toLowerCase().includes(query) ||
          item["artist"].toString().toLowerCase().includes(query)
        ) {
          return true;
        }

        return false;
      });
      setSongList(result);
    } else if (val === "") {
      setSongList(dataSong?.getSongs);
    }
    setSearchQuery(val);
  };

  useEffect(() => {
    if (data?.getPlaylists.length > 0) {
      const selected = data.getPlaylists[0];
      setActive(selectedPlaylist?.id ?? selected.id);
      setSelectedPlaylist(selected);
    }
  }, [data]);

  useEffect(() => {
    setSearchQuery("");
  }, [active]);

  useEffect(() => {
    if (dataSong?.getSongs.length > 0) {
      setSongsInPlaylist(dataSong?.getSongs);
      setSongList(dataSong?.getSongs);
    }
  }, [dataSong]);
  const onPlaylistChange = (val) => {
    setActive(val.id);
    setSelectedPlaylist(val);
  };

  function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  }
  const songChange = (song) => {
    setSongSelected(song);
    setCurrentSong(song);
  };
  return (
    <div className="sideBarContainer">
      <div className="playlist">
        <div className="logo">
          <img src={images.logo} alt="Spotify logo" />
        </div>
        <div className="listContainer">
          {loading
            ? "Loading"
            : data?.getPlaylists?.map((item) => (
                <div
                  className={`list ${active === item.id ? "active" : ""}`}
                  onClick={() => {
                    onPlaylistChange(item);
                  }}
                  key={item.id}
                >
                  {item.title}
                </div>
              ))}
        </div>
        <div className="profile">
          <img src={images.profile} alt="profile picture" />
        </div>
      </div>
      <div className="songsList">
        <div className="playListTitle">{selectedPlaylist?.title}</div>
        <div className="searchBar">
          <input
            placeholder="Search Song, Artist"
            value={searchQuery}
            onChange={(e) => search(e.target.value)}
          />
        </div>
        <div className="songContainer">
          {songList?.map((item) => (
            <div
              className={`menu ${
                currentSong?._id === item?._id ? "activeSong" : ""
              }`}
              key={item["_id"]}
              onClick={(e) => {
                songChange(item);
                e.stopPropagation();
              }}
            >
              <div className="songMenu">
                <div className="songImage">
                  <img src={item.photo} />
                </div>
                <div className="songDesc">
                  <div className="title">{item.title}</div>
                  <div className="artist">{item.artist}</div>
                </div>
              </div>
              <div className="songDuration">
                {secondsToMinutes(item.duration)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
