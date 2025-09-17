import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useContext, useMemo } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";

function AppStack() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack screenOptions={{ headerTintColor: "purple" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signIn" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signUp" options={{ headerShown: false }} />

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
  );
}

export default function RootLayout() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppStack />
      </AuthProvider>
    </QueryClientProvider>
  );
}
