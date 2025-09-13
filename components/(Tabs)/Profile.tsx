import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function ProfileScreen() {
  const { signout } = useContext(AuthContext);

  return (
    <View style={styles.background}>
      <Text style={styles.title}>My profile</Text>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/foodiez-logo.png")}
          style={styles.logo}
        />
        <View style={styles.infoBox}>
          <Text style={styles.username}>username</Text>
          <Text style={styles.email}>email</Text>
          <TouchableOpacity onPress={signout} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 80, alignItems: "center" },
//   signout: {
//     position: "absolute",
//     top: 40,
//     right: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   signoutText: { color: "purple", fontWeight: "bold" },
// });

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
