import React, { createContext, useState } from "react";

interface ContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

interface PropType {
  children: React.ReactNode;
}

function AuthProvider({ children }: PropType) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
