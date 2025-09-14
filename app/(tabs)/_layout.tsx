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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.9)",
        tabBarStyle: {
          backgroundColor: "#E0B0FF",
          paddingTop: 10,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          overflow: "hidden",
          position: "absolute",
          left: 10,
          right: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" size={25} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="createnew"
        options={{
          href: null,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};
export default _layout;
