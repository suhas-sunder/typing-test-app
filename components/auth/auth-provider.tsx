"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api/client";

type AuthState = {
  isAuthenticated: boolean;
  userId: string | null;
  userName: string | null;
  email: string | null;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  loginWithToken: (token: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type VerifyResponse = {
  verified: boolean;
  userId: string;
  userName: string;
  email: string;
};

const emptyState: AuthState = {
  isAuthenticated: false,
  userId: null,
  userName: null,
  email: null,
  isLoading: true,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(emptyState);

  const refresh = useCallback(async () => {
    const token = window.localStorage.getItem("jwt_token");

    if (!token) {
      setState({ ...emptyState, isLoading: false });
      return;
    }

    try {
      const response = await apiRequest<VerifyResponse>("/v1/api/user/is-verify");
      setState({
        isAuthenticated: response.verified,
        userId: response.userId,
        userName: response.userName,
        email: response.email,
        isLoading: false,
      });
    } catch {
      window.localStorage.removeItem("jwt_token");
      setState({ ...emptyState, isLoading: false });
    }
  }, []);

  const loginWithToken = useCallback(async (token: string) => {
    window.localStorage.setItem("jwt_token", token);
    await refresh();
  }, [refresh]);

  const logout = useCallback(() => {
    window.localStorage.removeItem("jwt_token");
    setState({ ...emptyState, isLoading: false });
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      loginWithToken,
      logout,
      refresh,
    }),
    [loginWithToken, logout, refresh, state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
