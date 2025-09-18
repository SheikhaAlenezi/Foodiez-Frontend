import { getAllIngredients } from "@/api/ingredient";
import { createRecipe } from "@/api/recipe";
import { SelectedIngredient } from "@/data/userInfo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CategoriesList from "../CategoriesList";
import IngredientDropdown from "../Ingredient";

interface RecipeInfo {
  title: string;
  description: string;
  instructions: string;
  prep: string;
  serving: string;
  category: string;
  ingredients: SelectedIngredient[];
}

const CreateNewScreen = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["allRecipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipesByCategory"] });
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 2000);
    },
    onError: (err: any) => {
      const serverMessage = err.response?.data?.message;
      setErrorMessage(serverMessage || "recipe already exists");
      setTimeout(() => setErrorMessage(""), 2000);
    },
  });

  const { data: ingredients = [] } = useQuery({
    queryKey: ["ingredients"],
    queryFn: getAllIngredients,
  });

  const [recipeInfo, setRecipeInfo] = useState<RecipeInfo>({
    title: "",
    description: "",
    instructions: "",
    prep: "",
    serving: "",
    category: "",
    ingredients: [],
  });

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Create Recipe</Text>

            <View style={styles.container}>
              <ScrollView
                style={{
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  marginBottom: 100,
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.username}>
                  Share your delecious creations!
                </Text>
                <View style={styles.formBox}>
                  <Text style={styles.label}>Recipe name</Text>
                  <TextInput
                    onChangeText={(text) => {
                      setRecipeInfo({ ...recipeInfo, title: text });
                    }}
                    style={styles.input}
                    placeholder="Enter recipe name"
                    placeholderTextColor={"white"}
                  />
                  <Text style={styles.label}>Recipe description</Text>
                  <TextInput
                    multiline
                    textAlignVertical="top"
                    onChangeText={(text) => {
                      setRecipeInfo({ ...recipeInfo, description: text });
                    }}
                    style={styles.inputBig}
                    placeholder="Enter recipe description"
                    placeholderTextColor={"white"}
                  />
                  <Text style={styles.label}>Recipe instructions</Text>
                  <TextInput
                    multiline
                    textAlignVertical="top"
                    onChangeText={(text) => {
                      setRecipeInfo({ ...recipeInfo, instructions: text });
                    }}
                    style={styles.inputBig}
                    placeholder="Enter recipe instructions"
                    placeholderTextColor={"white"}
                  />
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.smallView}>
                      <Text style={styles.label}>Prep time</Text>
                      <TextInput
                        onChangeText={(text) => {
                          setRecipeInfo({ ...recipeInfo, prep: text });
                        }}
                        style={styles.inputSmall}
                        placeholder="30 minutes"
                        placeholderTextColor={"white"}
                      />
                    </View>
                    <View style={styles.smallView}>
                      <Text style={styles.label}>Serving</Text>
                      <TextInput
                        onChangeText={(text) => {
                          setRecipeInfo({ ...recipeInfo, serving: text });
                        }}
                        style={styles.inputSmall}
                        placeholder="4 people"
                        placeholderTextColor={"white"}
                      />
                    </View>
                  </View>
                  <Text style={styles.label}>Category</Text>
                  <CategoriesList
                    onCategorySelect={(categoryId) =>
                      setRecipeInfo({ ...recipeInfo, category: categoryId })
                    }
                  />
                </View>
                {/* ingreidients */}
                <View style={styles.formBox}>
                  <IngredientDropdown
                    ingredients={ingredients}
                    onChange={(selected) =>
                      setRecipeInfo({ ...recipeInfo, ingredients: selected })
                    }
                  />
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    onPress={() => {
                      router.replace("/(tabs)/recipe");
                      setRecipeInfo({
                        title: "",
                        description: "",
                        instructions: "",
                        prep: "",
                        serving: "",
                        category: "",
                        ingredients: [],
                      });
                    }}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.buttonText}> Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => {
                      setShowPreview(true);
                    }}
                  >
                    <Text style={[styles.buttonText, { color: "#fff" }]}>
                      Create Recipe
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Modal visible={showPreview} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recipe Preview</Text>
            <View style={styles.previewCard}>
              <Text style={styles.previewHeader}>
                {recipeInfo.title || "Recipe Name"}
              </Text>

              <View style={styles.previewSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.sectionText}>
                  {recipeInfo.description || "No description provided"}
                </Text>
              </View>

              <View style={styles.previewRow}>
                <View style={styles.previewBox}>
                  <Text style={styles.sectionTitle}>Prep Time</Text>
                  <Text style={styles.sectionText}>
                    {recipeInfo.prep || "Prep time"}
                  </Text>
                </View>
                <View style={styles.previewBox}>
                  <Text style={styles.sectionTitle}>Serving</Text>
                  <Text style={styles.sectionText}>
                    {recipeInfo.serving || "Serving"}
                  </Text>
                </View>
                <View style={styles.previewBox}>
                  <Text style={styles.sectionTitle}>Category</Text>
                  <Text style={styles.sectionText}>
                    {recipeInfo.category || "Category"}
                  </Text>
                </View>
              </View>

              <View style={styles.previewSection}>
                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.sectionText}>
                  {recipeInfo.instructions || "No instructions provided"}
                </Text>
              </View>
              {/* ingredients */}
              <View style={styles.previewSection}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {recipeInfo.ingredients.length > 0 ? (
                  recipeInfo.ingredients.map((ing, index) => (
                    <Text key={index} style={styles.sectionText}>
                      • {ing.names} {ing.amount ? `- ${ing.amount}` : ""}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.sectionText}>
                    No Ingredients provided
                  </Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={() => {
                mutation.mutate({
                  ...recipeInfo,
                  ingredients: recipeInfo.ingredients.map((ing) => ({
                    ingredient: ing._id,
                    amount: ing.amount || "",
                  })) as any,
                });
                setShowPreview(false);
                setRecipeInfo({
                  title: "",
                  description: "",
                  instructions: "",
                  prep: "",
                  serving: "",
                  category: "",
                  ingredients: [],
                });
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Confirm & Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowPreview(false)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            {successMessage && (
              <View
                style={{
                  backgroundColor: "green",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "white" }}>Recipe added!!</Text>
              </View>
            )}
            {errorMessage !== "" && (
              <View
                style={{ backgroundColor: "red", padding: 10, borderRadius: 8 }}
              >
                <Text style={{ color: "white" }}>{errorMessage}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateNewScreen;

const styles = StyleSheet.create({
  formBox: {
    margin: 17,
    padding: 10,
    gap: 7,
  },
  previewCard: {
    width: "100%",
    borderRadius: 15,
    padding: 20,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    width: "100%",
    backgroundColor: "purple",
  },
  dropdownContainer: {
    backgroundColor: "#fbd8eeff", // pastel pink
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 17,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff", // default white
  },
  cancelButton: {
    width: 150,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    backgroundColor: "#ccc",
  },
  createButton: {
    width: 150,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    backgroundColor: "purple",
  },
  previewHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "purple",
  },
  previewSection: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  previewBox: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fbd8eeff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "purple",
  },
  inputBig: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fbd8eeff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  smallView: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputSmall: {
    width: "90%",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fbd8eeff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  background: {
    height: "100%",
    backgroundColor: "#FFB0E0",
    justifyContent: "flex-end",
  },
  icon: {
    textAlignVertical: "center", // vertical centering (Android)
    justifyContent: "center", // vertical centering (iOS/flex)
    alignItems: "center", // horizontal centering (flex)
    display: "flex",
    backgroundColor: "#E95322",
    height: 60,
    width: 60,
    borderRadius: 10,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  username: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    marginTop: 50,
    textAlign: "center",
  },
  cardName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 700,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.9)",
  },
});
