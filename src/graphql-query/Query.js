import { gql } from "@apollo/client";

export const PLAYLIST = gql`
  query {
    getPlaylists {
      id
      title
    }
  }
`;

export const SONG_LIST = gql`
  query GetSongs($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      photo
      _id
      artist
      duration
      title
      url
    }
  }
`;
