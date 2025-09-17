import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <TouchableOpacity style={styles.card}>
      {recipe.image && (
        <Image source={{ uri: recipe.image }} style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {recipe.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  info: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "purple",
  },
  desc: {
    fontSize: 14,
    color: "#666",
  },
});
