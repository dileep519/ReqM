import React, { createContext, useState } from "react";

export const UserContext = createContext();

let authtoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA1Mzg2ZjA0YzFhZDA2ZTA5MTdkMDEiLCJpYXQiOjE2MTA5NjA4Mjh9.icerpE37UniB_mJmUBchXO1-l4m6PNoDofwus0Wxgeo";

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(authtoken);

  return (
    <UserContext.Provider value={{ user: [user, setUser] }}>
      {props.children}
    </UserContext.Provider>
  );
};
