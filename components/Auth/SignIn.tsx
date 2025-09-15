import { signIn } from "@/api/auth";
import { AuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
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

const SignInScreen = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNull, setIsNull] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["signin"],
    mutationFn: signIn,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      router.replace("/(tabs)");
    },
    onError: (err: AxiosError) => {
      console.log(err.message, err.cause);
      Alert.alert("signin failed", err.message || "try later aligator");
    },
  });

  const SignUpSchema = Yup.object().shape({
    username: Yup.string().required("username required"),
    password: Yup.string()
      .min(4, "Password must be atleast 4 characters long ")
      .required("password required"),
  });

  const handleSignUp = async () => {
    try {
      await SignUpSchema.validate({ username, password });
      mutate({ username, password });
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
            style={styles.background}
            resizeMode="contain"
          /> */}

          <Image
            source={require("../../assets/images/chef.png")}
            style={styles.background}
            resizeMode="contain"
          ></Image>

          <Text style={styles.title}>Sign In</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="#c3c3c3ff"
              value={username}
              onChangeText={setUsername}
              style={styles.inputText}
            />
            <View style={{ position: "relative", marginBottom: 20 }}>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                onChangeText={(text) => {
                  setPassword(text);
                  text === null ? setIsNull(true) : setIsNull(false);
                }}
                placeholder="Enter your password"
                value={password}
                placeholderTextColor="#c3c3c3ff"
                secureTextEntry={!showPassword}
                style={[styles.inputText, { paddingRight: 45 }]} // make space for the icon
              />

              {!isNull && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 30, // adjust to vertically center the icon
                    marginBottom: 0, // remove original margin
                  }}
                >
                  <View>
                    {showPassword ? (
                      <Ionicons name="eye-outline" size={20} color="gray" />
                    ) : (
                      <Ionicons name="eye-off-outline" size={20} color="gray" />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* <Text style={styles.label}>Password:</Text>
            <TextInput
              onChangeText={(text) => {
                return (
                  text === null ? setIsNull(true) : setIsNull(false),
                  setPassword
                );
              }}
              placeholder="Enter your password"
              placeholderTextColor="#c3c3c3ff"
              secureTextEntry={!showPassword}
              style={styles.inputText}
            />

            {!isNull && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ marginBottom: 20 }}
              >
                <View>
                  {!showPassword ? (
                    <Ionicons name="eye-outline" size={20} color="purple" />
                  ) : (
                    <Ionicons name="eye-off-outline" size={20} color="purple" />
                  )}
                </View>
              </TouchableOpacity>
            )} */}

            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40, //hah
    paddingVertical: 40,
    justifyContent: "center",
    backgroundColor: "#eec3fcff",
  },
  background: {
    width: 250,
    height: 250,
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
    padding: 15, //here also
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
    borderRadius: 10, //here
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
