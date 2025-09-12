import CustomizeButton from "@/components/customizeButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const handlesigninButton = () => {
    router.dismissTo("/auth/signIn");
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/foodie-animation.json/KiJRoq3tkZ.json")}
        autoPlay
        loop={true}
        style={styles.lottie}
      />
      <View style={{ width: "30%", alignItems: "center" }}>
        <CustomizeButton text={"Signin"} onPress={handlesigninButton} />
        <View style={{ flexDirection: "row" }}>
          <Text>No Account?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/signUp")}>
            <Text style={{ fontWeight: "500" }}>signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eec3fcff",
  },
  lottie: {
    height: 400,
    width: 400,
  },
});
