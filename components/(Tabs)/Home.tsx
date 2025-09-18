import { getRecipesByCategory } from "@/api/category";
import { getAllRecipe } from "@/api/recipe";
import RecipeCard from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoriesList from "../CategoriesList";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: recipesByCategory, isLoading: loadingCategory } = useQuery({
    queryKey: ["recipes", selectedCategory],
    queryFn: () => getRecipesByCategory(selectedCategory as string),
    enabled: !!selectedCategory,
  });

  const { data: allRecipes, isLoading: loadingAll } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipe,
    enabled: !selectedCategory,
  });

  const dataToShow = selectedCategory ? recipesByCategory : allRecipes;
  const isLoading = selectedCategory ? loadingCategory : loadingAll;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <CategoriesList onCategorySelect={setSelectedCategory} />

        <Text style={styles.sectionTitle}>Popular Recipes</Text>
        {/* category recipe */}
        {isLoading && <Text>Loading...</Text>}
        {dataToShow?.length === 0 && !isLoading && (
          <Text>No recipes found</Text>
        )}
        {dataToShow?.map((r: any) => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 20,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
    color: "#333",
  },
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
