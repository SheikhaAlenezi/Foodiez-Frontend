import { SignInInfo, UserInfo } from "@/data/userInfo";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signout: () => Promise<void>;
  // user: UserInfo | null;
  // setUser: (user: UserInfo | null) => void;
  // signin: (values: SignInInfo) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  signout: async () => {},
  // user: null,

  // setUser: () => {},
  // signin: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

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
  const signin = async (values: SignInInfo) => {
    try {
      const response = await axios.post(
        "$http://192.168.7.112:8000/api/auth/signin",
        values
      );
      await SecureStore.setItemAsync("token", response.data.token);
      setUser({
        username: response.data.user.username,
        email: response.data.user.email,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.log("signin error:", error);
      throw error;
    }
  };

  const signout = async () => {
    await SecureStore.deleteItemAsync("token");
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        signout,
        // user,
        // setUser,
        // signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
