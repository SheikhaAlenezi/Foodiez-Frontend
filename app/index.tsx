import CustomizeButton from "@/components/customizeButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const handlesigninButton = () => {
    router.dismissTo("/auth/signIn");
  };

  const handlesignUpButton = () => {
    router.dismissTo("/auth/signUp");
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/foodie-animation.json/KiJRoq3tkZ.json")}
        autoPlay
        loop={true}
        style={styles.lottie}
      />
      <View style={{ width: 300, gap: 20, alignItems: "center" }}>
        <CustomizeButton text={"Sign In"} onPress={handlesigninButton} />
        <CustomizeButton text={"Sign Up"} onPress={handlesignUpButton} />
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
