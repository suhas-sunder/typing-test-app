import React, { createContext, useState } from "react";

interface ContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userId: string;
  setUserId: (value:string) => void;
}

export const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userId: "",
  setUserId: () => {},
});

interface PropType {
  children: React.ReactNode;
}

function AuthProvider({ children }: PropType) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
