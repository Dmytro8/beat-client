import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";

import { musicAPI } from "../../api/musicAPI";
import { Spinner } from "../../components/common/FormControls";
import { Playlist } from "../../components/Playlist";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { setPlaylist } from "../../contexts/PlayerContext/actions";

const ProfilePage = () => {
  const [stateProfile, dispatchProfile]: any = useContext(ProfileContext);
  const [statePlayer, dispatchPlayer]: any = useContext(PlayerContext);
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
