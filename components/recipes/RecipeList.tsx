import { getRecipesByCategory } from "@/api/category";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const RecipeList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes", selectedCategory],
    queryFn: () => getRecipesByCategory(selectedCategory as string),
    enabled: !!selectedCategory,
  });
  return (
    <View>
      {isLoading && <Text>Loading</Text>}
      {recipes?.data?.map((r: any) => (
        <View key={r._id} style={styles.recipeCard}>
          <Text style={styles.recipeTitle}>{r.title}</Text>
          <Text style={styles.recipeDescription}>{r.instructions}</Text>
        </View>
      ))}
    </View>
  );
};

export default RecipeList;

const styles = StyleSheet.create({
  recipeCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
  },
});
