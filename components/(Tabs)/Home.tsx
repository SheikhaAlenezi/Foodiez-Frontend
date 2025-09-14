import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { signout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signout} style={styles.signout}>
        <Text style={styles.signoutText}> SIGN OUT</Text>
      </TouchableOpacity>
      <Text>Home Page </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, alignItems: "center" },
  signout: {
    position: "absolute",
    top: 40,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  signoutText: { color: "purple", fontWeight: "bold" },
});
