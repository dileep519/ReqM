import React, { createContext, useState } from "react";

export const UserContext = createContext();

let authtoken = null;

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(authtoken);

  return (
    <UserContext.Provider value={{ user: [user, setUser] }}>
      {props.children}
    </UserContext.Provider>
  );
};
