import React, { useContext } from "react";
import "./HomePage.scss";
import SideBar from "../../Components/SideBar/SideBar";
import MusicPlayer from "../../Components/MusicPlayer/MusicPlayer";
import { PlayerContext } from "../../Context/PlayerContext";

const HomePage = () => {
  const { themeColor } = useContext(PlayerContext);
  return (
    <div
      className="container"
      style={{
        backgroundImage: `linear-gradient(to right,#151515 , ${
          themeColor ?? "#151515"
        },#151515)`,
      }}
    >
      <SideBar />
      <MusicPlayer />
    </div>
  );
};

export default HomePage;
