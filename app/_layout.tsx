import { deleteToken, getToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); //heree false
  const queryClient = new QueryClient();

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setIsAuthenticated(true);
      console.log(token);
    }
  };
  useEffect(() => {
    checkToken();
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          signout: async () => {
            await deleteToken();
            setIsAuthenticated(false);
          },
        }}
      >
        <Stack screenOptions={{ headerTintColor: "purple" }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen
            name="auth/signIn"
            options={{
              title: "Signin",
              headerBackTitle: "Main",
              headerShown: false,
            }}
          />

          {/* <Stack.Screen
               name=""
               options={{
                headerShown:false,
               }} /> */}

          <Stack.Screen
            name="auth/signUp"
            options={{
              title: "SignUp",
              headerBackTitle: "Main",
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

//

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Stack } from "expo-router";
// import { useContext, useMemo } from "react";
// import { AuthContext, AuthProvider } from "../context/AuthContext";

// function AppStack() {
//   const { isAuthenticated } = useContext(AuthContext);

//   return (
//     <Stack screenOptions={{ headerTintColor: "purple" }}>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="auth/signIn" options={{ headerShown: false }} />
//       <Stack.Screen name="auth/signUp" options={{ headerShown: false }} />

//       <Stack.Protected guard={isAuthenticated}>
//         <Stack.Screen
//           name="(tabs)"
//           options={{
//             headerBackVisible: false,
//             headerShown: false,
//           }}
//         />
//       </Stack.Protected>
//     </Stack>
//   );
// }

// export default function RootLayout() {
//   const queryClient = useMemo(() => new QueryClient(), []);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <AppStack />
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }
