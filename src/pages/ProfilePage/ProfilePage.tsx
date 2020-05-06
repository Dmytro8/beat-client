import React, { useContext, useEffect } from "react";
import { ProfileContext } from "../../contexts/ProfileContext/profileContext";

const ProfilePage = () => {
  const [stateProfile, dispatchProfile] = useContext(ProfileContext);
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      <h2>You got the next user:</h2>
      <ul>
        <li>{stateProfile.profile.username}</li>
        <li>{stateProfile.profile.email}</li>
      </ul>
    </div>
  );
};

export default ProfilePage;
