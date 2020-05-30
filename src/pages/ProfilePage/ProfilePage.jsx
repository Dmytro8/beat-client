import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";

import { Song } from "../../components/Playlist/Song";
import { musicAPI } from "../../api/musicAPI";
import { Spinner } from "../../components/common/FormControls";
import { Playlist } from "../../components/Playlist";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { setPlaylist } from "../../contexts/PlayerContext/actions";

import playlist from "../../static/images/playlist.png";

const ProfilePage = () => {
  const [stateProfile, dispatchProfile] = useContext(ProfileContext);
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [isSongsLoading, setIsSongsLoading] = useState(true);
  useEffect(() => {
    const getAllSongs = async () => {
      setIsSongsLoading(true);
      const response = await musicAPI.getAllSongs();
      dispatchPlayer(setPlaylist(response.slice(0, 3)));
      setIsSongsLoading(false);
    };
    getAllSongs();
    return () => {};
  }, [dispatchPlayer]);
  return (
    <div>
      <h1>Hello</h1>
      <h2>You got the next user:</h2>
      <ul>
        <li>{stateProfile.profile.username}</li>
        <li>{stateProfile.profile.email}</li>
      </ul>
      {isSongsLoading ? (
        <Spinner />
      ) : (
        <div style={{ display: "grid", justifyItems: "center" }}>
          <Playlist />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
