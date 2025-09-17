import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  signout: () => Promise<void>;
  signIn: (token: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  signout: async () => {},
  signIn: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setIsAuthenticated(!!token);
      } catch (err) {
        console.log("error checking token:", err);
        setIsAuthenticated(false);
      }
    };
    checkToken();
  }, []);

  const signIn = async (token: string) => {
    try {
      await SecureStore.setItemAsync("token", token);
      setIsAuthenticated(true);
    } catch (err) {
      console.log("error storing token", err);
      setIsAuthenticated(false);
    }
  };

  const signout = async () => {
    await SecureStore.deleteItemAsync("token");
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, signout, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
