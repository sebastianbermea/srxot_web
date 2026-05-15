import React, { useState, useContext, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context)
        throw new Error("useUser must be used within a UserContextProvider");
    return context;
};