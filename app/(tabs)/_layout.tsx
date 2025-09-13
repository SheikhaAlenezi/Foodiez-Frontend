import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const _layout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  // const handleSignOut = async () => {
  //   setIsAuthenticated(false);
  //   router.dismissTo("/landingPage");
  // };
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={26}
              color="purple"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" size={25} color="purple" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={24} color="purple" />
          ),
        }}
      />
    </Tabs>
  );
};
export default _layout;
