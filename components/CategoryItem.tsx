import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CategoryItem {
  name: string;
  color: string;
  icon?: string;
  onPress?: () => void;
}
const CategoryItem: React.FC<CategoryItem> = ({
  name,
  color,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color || "#ddd" }]}
      onPress={onPress}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
    marginBottom: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
