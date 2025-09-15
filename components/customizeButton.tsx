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
    height: 60,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
});
