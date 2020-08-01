import { Playlist, Providers } from "../models/playlist";
import axios from "axios";

export const getPlaylistsByUser = (userId: string): Promise<ReadonlyArray<Playlist>> => {
  return axios
    .get("http://localhost:5000/playlists", {
      withCredentials: true,
    })
    .then(response => response.data);
};

export const getPlaylistById = (id: string): Promise<Playlist> => {
  return Promise.resolve({
    id: "1",
    name: "Test playlist 1",
    length: 5,
    owner: "Pierca",
    provider: Providers.Spotify,
    thumbnail: "",
    songs: [
      {
        name: "Song 1",
        length: 180,
        url: "https://open.spotify.com/track/1LhFadk0aWYczltTjIbFlI?si=mplr7cPzQIWZfBY8DnHnEA",
        thumbnail: "",
      },
      {
        name: "Song 2",
        length: 240,
        url: "https://open.spotify.com/track/1LhFadk0aWYczltTjIbFlI?si=mplr7cPzQIWZfBY8DnHnEA",
        thumbnail: "",
      },
      {
        name: "Song 3",
        length: 150,
        url: "https://open.spotify.com/track/1LhFadk0aWYczltTjIbFlI?si=mplr7cPzQIWZfBY8DnHnEA",
        thumbnail: "",
      },
      {
        name: "Song 4",
        length: 380,
        url: "https://open.spotify.com/track/1LhFadk0aWYczltTjIbFlI?si=mplr7cPzQIWZfBY8DnHnEA",
        thumbnail: "",
      },
      {
        name: "Song 5",
        length: 270,
        url: "https://open.spotify.com/track/1LhFadk0aWYczltTjIbFlI?si=mplr7cPzQIWZfBY8DnHnEA",
        thumbnail: "",
      },
    ],
    url: "https://open.spotify.com/playlist/3ixKACdmxriXIvwGd8Ybwy?si=mQU8NYejR2KU0FNOczndpg",
  });
};
