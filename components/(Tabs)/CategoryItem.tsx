import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Category {
  name: string;
  icon: string;
}

const CategoryItem = () => {
  const categories: Category[] = [
    { name: "Pizza", icon: "🍕" },
    { name: "Burgers", icon: "🍔" },
    { name: "Sushi", icon: "🍣" },
    { name: "Pasta", icon: "🍝" },
    { name: "Salads", icon: "🥗" },
    { name: "Desserts", icon: "🍰" },
    { name: "Seafood", icon: "🐟" },
    { name: "Breakfast", icon: "🍳" },
    { name: "Drinks", icon: "🧃" },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      style={{ height: 120 }}
    >
      {categories.map((c) => (
        <TouchableOpacity style={styles.circle} key={c.name}>
          <Text style={styles.text}>{c.icon}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  circle: {
    height: 90,
    width: 90,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    color: "#333",
    fontSize: 42,
  },
});
