import { Tabs } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const _layout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  // const handleSignOut = async () => {
  //   setIsAuthenticated(false);
  //   router.dismissTo("/landingPage");
  // };
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
    </Tabs>
  );
};
export default _layout;
