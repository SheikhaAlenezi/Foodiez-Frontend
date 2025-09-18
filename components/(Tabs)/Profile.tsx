import { getMyProfile } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function ProfileScreen() {
  // const { signout }= useContext(AuthContext);
  const { setIsAuthenticated } = useContext(AuthContext);
  const handleSignout = async () => {
    await deleteToken();
    setIsAuthenticated(false);
    router.replace("/auth/signIn");
  };
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getMyProfile,
  });

  console.log("profile", data);
  if (isFetching) return <Text>Loading...</Text>;

  return (
    <View style={styles.background}>
      <Text style={styles.title}>My profile</Text>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/foodiez-logo.png")}
          style={styles.logo}
        />
        <View style={styles.infoBox}>
          <Text style={styles.username}>{data.username} </Text>
          <Text style={styles.email}>{data.email}</Text>
          <TouchableOpacity onPress={handleSignout} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "#FFB0E0",
    justifyContent: "flex-end",
  },
  username: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.9)",
  },
  buttonText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#E0B0FF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    width: 200,
    marginTop: 50,
  },
  email: {
    fontSize: 17,
    // fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoBox: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 80,
    borderRadius: 100,
    padding: 20,
    backgroundColor: "#F3E9B5",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 700,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
