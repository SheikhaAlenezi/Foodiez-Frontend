import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type customizeTextProps = {
  text: string;
  onPress: () => void;
};

const CustomizeButton = ({ text, onPress }: customizeTextProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#6A3FE0" : "#b01afbff" },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default CustomizeButton;
const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
