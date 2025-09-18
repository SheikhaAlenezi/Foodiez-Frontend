import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  prep: string;
  serving: string;
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.desc} numberOfLines={3}>
          {recipe.description}
        </Text>
        <View style={{ flexDirection: "row", gap: 35, marginTop: 10 }}>
          <Text style={styles.metaText}>{`⏲️ ${recipe.prep || ""}`}</Text>
          <Text style={styles.metaText}>{`👥 ${recipe.serving || ""}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fdf6f9", // soft pastel pink
    borderRadius: 25,
    margin: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0d6e0", // subtle border for official look
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  info: {
    padding: 16,
    gap: 6, // adds space between children
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#8e44ad", // deep purple
  },
  desc: {
    fontSize: 19,
    color: "#555",
    lineHeight: 20,
    marginBottom: 5,
  },
  meta: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 15,
    color: "#575757ff",
    fontWeight: "500",
  },
});
