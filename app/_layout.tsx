import { getToken } from "@/api/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RootLayout() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  console.log(isAuthenticated);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getToken(); //storage token
        setIsAuthenticated(!!token);
      } catch (err) {
        console.log("token check failed:", err);
        setIsAuthenticated(false);
      }
    };
    checkToken();
  }, []);
  const signout = async () => {
    await SecureStore.deleteItemAsync("token");
    setIsAuthenticated(false);
  };
  if (isAuthenticated === null) {
    return null;
  }
  //landingPage
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, signout }}
      >
        <Stack screenOptions={{ headerTintColor: "purple" }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth/signIn"
            options={{
              title: "SignIn",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/signUp"
            options={{
              title: "SignUp",
              headerShown: false,
            }}
          />
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerBackVisible: false,
                headerShown: false,
              }}
            />
          </Stack.Protected>
        </Stack>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
