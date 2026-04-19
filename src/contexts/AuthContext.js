import React, {createContext, useCallback, useMemo} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {communityAPI} from "../services/communityAPI";

const AuthContext = createContext({
  user: null,
  login: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
  isLoggedIn: false
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useLocalStorage("community_user", null);

  const login = useCallback(
    async ({provider, displayName, email}) => {
      const safeName = (displayName || "").trim();
      if (!safeName) return false;
      const safeEmail = (email || "").trim().toLowerCase();
      const baseUser = {
        id: `${Date.now()}`,
        provider: provider || "guest",
        displayName: safeName,
        email: safeEmail || null,
        role: "member",
        loginAt: new Date().toISOString()
      };

      if (communityAPI.isEnabled()) {
        try {
          const session = await communityAPI.createSession(baseUser);
          if (session?.ok && session.token) {
            baseUser.sessionToken = session.token;
            baseUser.sessionIssuedAt = session.issuedAt;
            baseUser.role = session.role || baseUser.role;
            baseUser.email = session.email || baseUser.email;
          }
        } catch {
          // keep local-only login if session creation fails
        }
      }

      setUser(baseUser);
      return true;
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const loginWithGoogle = useCallback(
    async ({idToken}) => {
      if (!idToken || !communityAPI.isEnabled()) return false;
      try {
        const session = await communityAPI.createGoogleSession({idToken});
        if (!session?.ok || !session.token || !session.user) return false;
        setUser({
          id: session.user.id,
          provider: session.user.provider || "google",
          displayName: session.user.displayName,
          email: session.user.email,
          picture: session.user.picture || null,
          role: session.role || "member",
          sessionToken: session.token,
          sessionIssuedAt: session.issuedAt,
          loginAt: new Date().toISOString()
        });
        return true;
      } catch {
        return false;
      }
    },
    [setUser]
  );

  const value = useMemo(
    () => ({
      user,
      login,
      loginWithGoogle,
      logout,
      isLoggedIn: Boolean(user)
    }),
    [user, login, loginWithGoogle, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
