import React, { createContext, useState, useContext } from "react";

const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children } = {}) => {
  const [profileImage, setProfileImage] = useState(null);

  return (
    <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfileImage = () => useContext(ProfileImageContext);
