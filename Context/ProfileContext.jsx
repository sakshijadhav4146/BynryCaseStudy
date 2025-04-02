import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import profilesData from "../Data/Profiledata.json"

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
   
    try {
      setProfiles(profilesData);
    } catch (err) {
      setError("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, []);


  const addProfile = (profile) => {
    setProfiles([...profiles, profile]);
  };

  const editProfile = (id, updateProfile) => {
    setProfiles(
      profiles.map((profile) => (profile.id == id ? updateProfile : profile))
    );
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id != id));
  };

  return (
    <>
      <ProfileContext.Provider
        value={{
          profiles,
          loading,
          error,
          addProfile,
          editProfile,
          deleteProfile,
        }}
      >
        {children}
      </ProfileContext.Provider>
    </>
  );
};
