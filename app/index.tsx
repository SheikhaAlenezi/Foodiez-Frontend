import SignUpScreen from "@/components/Auth/SignUp";
import { StyleSheet } from "react-native";

export default function Index() {
  return <SignUpScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
