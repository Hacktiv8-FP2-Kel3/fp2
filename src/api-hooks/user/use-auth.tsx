import * as React from "react";
import { loginAPI, logout } from "../../redux/reducers/userSlice";
import { useAppDispatch } from "../../redux/store";

interface AuthContextType {
  token: string | null;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}
const AuthContext = React.createContext<AuthContextType>({
  token: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(null);
  const [isReady, setReady] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const signIn = React.useCallback(
    async (username: string, password: string) => {
      const res = await dispatch(loginAPI({ username, password })).unwrap();
      localStorage.setItem("token", res.token);
      setToken(res.token);
    },
    [dispatch]
  );
  const signOut = React.useCallback(() => {
    dispatch(logout());
    localStorage.setItem("token", "");
    setToken(null);
  }, [dispatch]);

  React.useEffect(() => {
    setReady(false);
    const localStorageValue = localStorage.getItem("token");
    if (!token && !!localStorageValue) {
      setToken(localStorageValue);
    }
    setReady(true);
  }, [token]);

  if (!isReady) return null;
  let value = { token, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
