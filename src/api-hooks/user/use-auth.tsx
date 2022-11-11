import * as React from "react";
import { toast } from "react-toastify";
import { loginAPI, logout } from "../../redux/reducers/userSlice";
import { useAppDispatch } from "../../redux/store";
import { Auth } from "./user.model";

interface AuthContextType {
  auth: Auth | null;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}
const AuthContext = React.createContext<AuthContextType>({
  auth: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = React.useState<Auth | null>(null);
  const [isReady, setReady] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const signIn = React.useCallback(
    async (username: string, password: string) => {
      if (
        username === process.env.REACT_APP_ADMIN_USERNAME &&
        password === process.env.REACT_APP_ADMIN_PASSWORD
      ) {
        const token = Math.random().toString(36).substring(1, 11);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: token,
            isAdmin: true,
          })
        );
        setAuth({
          token: token,
          isAdmin: true,
        });
        toast.success("Login Berhasil");
      } else {
        const res = await dispatch(loginAPI({ username, password })).unwrap();
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: res.token,
            isAdmin: false,
          })
        );
        setAuth({
          token: res.token,
          isAdmin: false,
        });
      }
    },
    [dispatch]
  );
  const signOut = React.useCallback(() => {
    dispatch(logout());
    localStorage.setItem("auth", "");
    setAuth(null);
  }, [dispatch]);

  React.useEffect(() => {
    setReady(false);
    const localStorageValue = localStorage.getItem("auth");
    if (!auth && !!localStorageValue) {
      setAuth(JSON.parse(localStorageValue));
    }
    setReady(true);
  }, [auth]);

  if (!isReady) return null;
  let value = { auth, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
