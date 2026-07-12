"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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
  const mountedRef = useRef(false);
  const refreshRunIdRef = useRef(0);

  const refresh = useCallback(async () => {
    const runId = refreshRunIdRef.current + 1;
    refreshRunIdRef.current = runId;
    const token = readAuthToken();

    if (!token) {
      if (mountedRef.current) {
        setState({ ...emptyState, isLoading: false });
      }
      return;
    }

    try {
      const response = await apiRequest<VerifyResponse>("/v1/api/user/is-verify");
      if (mountedRef.current && refreshRunIdRef.current === runId) {
        setState({
          isAuthenticated: response.verified,
          userId: response.userId,
          userName: response.userName,
          email: response.email,
          isLoading: false,
        });
      }
    } catch {
      if (mountedRef.current && refreshRunIdRef.current === runId) {
        clearAuthToken();
        setState({ ...emptyState, isLoading: false });
      }
    }
  }, []);

  const loginWithToken = useCallback(async (token: string) => {
    writeAuthToken(token);
    await refresh();
  }, [refresh]);

  const logout = useCallback(() => {
    clearAuthToken();
    setState({ ...emptyState, isLoading: false });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void refresh();

    return () => {
      mountedRef.current = false;
      refreshRunIdRef.current += 1;
    };
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

function readAuthToken() {
  try {
    return window.localStorage.getItem("jwt_token");
  } catch {
    return null;
  }
}

function writeAuthToken(token: string) {
  try {
    window.localStorage.setItem("jwt_token", token);
  } catch {
    // Storage failures should not crash the session flow; verify will fail cleanly.
  }
}

function clearAuthToken() {
  try {
    window.localStorage.removeItem("jwt_token");
  } catch {
    // Storage may be unavailable in private or locked-down browser contexts.
  }
}
