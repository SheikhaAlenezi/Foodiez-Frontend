import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Ingredient {
  name: string;
  icon: string;
}

const ingredients: Ingredient[] = [
  { name: "Tomato", icon: "🍅" },
  { name: "Potato", icon: "🥔" },
  { name: "Carrot", icon: "🥕" },
  { name: "Onion", icon: "🧅" },
  { name: "Garlic", icon: "🧄" },
  { name: "Broccoli", icon: "🥦" },
  { name: "Mushroom", icon: "🍄" },
  { name: "Corn", icon: "🌽" },
  { name: "Cucumber", icon: "🥒" },
  { name: "Eggplant", icon: "🍆" },
  { name: "Lettuce", icon: "🥬" },
  { name: "Pepper", icon: "🌶️" },
  { name: "Avocado", icon: "🥑" },
  { name: "Lemon", icon: "🍋" },
  { name: "Apple", icon: "🍎" },
  { name: "Strawberry", icon: "🍓" },
  { name: "Banana", icon: "🍌" },
  { name: "Grapes", icon: "🍇" },
  { name: "Watermelon", icon: "🍉" },
  { name: "Pineapple", icon: "🍍" },
  { name: "Chicken", icon: "🍗" },
  { name: "Beef", icon: "🥩" },
  { name: "Fish", icon: "🐟" },
  { name: "Shrimp", icon: "🦐" },
  { name: "Egg", icon: "🥚" },
  { name: "Cheese", icon: "🧀" },
  { name: "Bread", icon: "🍞" },
  { name: "Rice", icon: "🍚" },
  { name: "Pasta", icon: "🍝" },
  { name: "Milk", icon: "🥛" },
];

const IngredientsItem = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const toggleSelection = (name: string) => {
    if (selectedIngredients.includes(name)) {
      setSelectedIngredients(selectedIngredients.filter((n) => n !== name));
    } else {
      setSelectedIngredients([...selectedIngredients, name]);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      style={{ height: 120 }}
    >
      {ingredients.map((i) => {
        const isSelected = selectedIngredients.includes(i.name);
        return (
          <TouchableOpacity
            key={i.name}
            onPress={() => toggleSelection(i.name)}
            style={isSelected ? styles.circleChosen : styles.circle}
          >
            <Text style={styles.text}>{i.icon}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default IngredientsItem;

const styles = StyleSheet.create({
  circle: {
    height: 70,
    width: 70,
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
  circleChosen: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderColor: "green",
    borderWidth: 3,
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
    fontSize: 30,
  },
});
