"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface SessionContextType {
  token: string | null;
  userId: string | null;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

/* ─────────────────────────────────────────── */

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  /* 1-time read from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (stored) {
      setTokenState(stored);
      setUserId(parseJwt(stored));
    }
  }, []);

  /* Helper */
  const writeToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
      setUserId(parseJwt(newToken));
    } else {
      localStorage.removeItem("auth_token");
      setUserId(null);
    }
  };

  /* LOG-OUT */
  const logout = async () => {
    try {
      /* Ask the server to clear the HttpOnly cookie */
      await fetch(`${process.env.NEXT_PUBLIC_URL_2}/auth/log-out`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.warn("logout request failed", e);
    }
    /* Clear client-side token + state */
    writeToken(null);
    /* Optionally redirect */
    router.push("/login");
    router.refresh(); // Next.js app router — revalidates server comps
  };

  return (
    <SessionContext.Provider
      value={{ token, userId, setToken: writeToken, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

/* ─────────────────────────────────────────── */

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

/* Util to parse userId from JWT */
function parseJwt(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id || payload.id || payload.sub || null;
  } catch {
    return null;
  }
}
