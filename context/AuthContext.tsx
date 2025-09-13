import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  signout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("error reading token", error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  const signout = async () => {
    await SecureStore.deleteItemAsync("token");
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
