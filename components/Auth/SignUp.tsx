import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    if (!email || !password || !username)
      return Alert.alert("error", "fill all feilds");
  };

  return (
    <View>
      <Text>Create Account</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text>{showPassword ? "Hide" : "show"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp}>
        <Text>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
