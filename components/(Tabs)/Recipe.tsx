import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RecipeScreen() {
  // const { signout } = useContext(AuthContext);

  return (
    <View style={styles.background}>
      <Text style={styles.title}>Create New</Text>
      <View style={styles.container}>
        <Text style={styles.username}>What would you like to add?</Text>
        <View>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/createnew")}
            style={styles.button}
          >
            <View style={styles.icon}>
              <Ionicons
                name="book-outline"
                size={35}
                color="rgba(255, 255, 255, 0.9)"
              />
            </View>
            <Text style={styles.cardName}>Create New Recipe</Text>
            <Text style={styles.email}>
              Share your favorite dish with the community!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.icon}>
              <Ionicons
                name="albums-outline"
                size={35}
                color="rgba(255, 255, 255, 0.9)"
              />
            </View>
            <Text style={styles.cardName}>Create New Category</Text>
            <Text style={styles.email}>
              Oragnize recipes with custom categories!
            </Text>
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
  icon: {
    textAlignVertical: "center", // vertical centering (Android)
    justifyContent: "center", // vertical centering (iOS/flex)
    alignItems: "center", // horizontal centering (flex)
    display: "flex",
    backgroundColor: "#E0B0FF",
    height: 60,
    width: 60,
    borderRadius: 10,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  username: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    marginTop: 50,
  },
  cardName: {
    fontSize: 20,
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
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 200,
    width: 340,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 16,
    margin: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  email: {
    fontSize: 17,
    // fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
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
