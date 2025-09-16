import { signUp } from "@/api/auth";
import { AuthContext } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
interface ErrorResponse {
  message?: string;
}

const SignUpScreen = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      router.replace("/(tabs)");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      const serverMessage = err.response?.data?.message;
      Alert.alert("signup failed", "couldn't create account,try again");
    },
  });

  const SignUpSchema = Yup.object().shape({
    username: Yup.string().required("username required"),
    email: Yup.string().email("email not correct").required("email required"),
    password: Yup.string()
      .min(4, "atleast 4 character ")
      .required("password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "password doesn't match")
      .required("confirm password"),
  });

  const handleSignUp = async () => {
    try {
      await SignUpSchema.validate({
        username,
        email,
        password,
        confirmPassword,
      });
      mutate({ username, email, password, confirmPassword });
    } catch (err: any) {
      Alert.alert("error", err.message);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* <Image
            source={require("../../assets/images/foodiez-logo.png")}
            style={styles.logo}
          /> */}

          <Image
            source={require("../../assets/images/chef.png")}
            style={styles.background}
            resizeMode="contain"
          ></Image>

          <Text style={styles.title}>Create Account</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              placeholder="type here"
              placeholderTextColor="#c3c3c3ff"
              value={username}
              onChangeText={setUsername}
              style={styles.inputText}
            />
            <Text style={styles.label}>Email:</Text>

            <TextInput
              placeholder="Enter you email"
              placeholderTextColor="#c3c3c3ff"
              value={email}
              onChangeText={setEmail}
              style={styles.inputText}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              placeholder="Create password"
              placeholderTextColor="#c3c3c3ff"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              style={styles.inputText}
            />
            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
              placeholder="Rewrite Password"
              placeholderTextColor="#c3c3c3ff"
              value={confirmPassword}
              secureTextEntry={!showPassword}
              onChangeText={setConfirmPassword}
              style={styles.inputText}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ marginBottom: 20 }}
            >
              <Text>{showPassword ? "Hide" : "show"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <Text>Have an account?</Text>
            <TouchableOpacity onPress={() => router.dismissTo("/auth/signIn")}>
              <Text style={{ fontWeight: "bold", color: "purple" }}>logIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40, //here
    justifyContent: "center",
    backgroundColor: "#eec3fcff",
  },
  background: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginVertical: 10,
  },
  logo: {
    width: 80,
    height: 80,
    top: 20,
    left: 20,
    position: "absolute",
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "purple",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15, //here
    borderRadius: 20, //here
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
    width: "100%",
    alignSelf: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "purple",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    color: "#000000ff",
  },
  button: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
