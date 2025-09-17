import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

interface Ingredient {
  _id: string;
  name: string;
}

interface SelectedIngredient extends Ingredient {
  amount: string;
}

const IngredientDropdown = ({ ingredients }: { ingredients: Ingredient[] }) => {
  const [selected, setSelected] = useState<SelectedIngredient[]>([]);

  const handleChange = (ids: string[]) => {
    const newSelected = ids.map((id) => {
      const found = selected.find((s) => s._id === id);
      const ingredient = ingredients.find((i) => i._id === id)!;
      return found || { ...ingredient, amount: "" };
    });
    setSelected(newSelected);
  };

  const updateAmount = (id: string, value: string) => {
    setSelected((prev) =>
      prev.map((s) => (s._id === id ? { ...s, amount: value } : s))
    );
  };

  const handleSubmit = () => {
    console.log("Ingredients added:", selected);
  };
  return (
    <View>
      <Text style={styles.label}>Ingredients</Text>

      <MultiSelect
        style={styles.dropdown}
        data={ingredients}
        labelField="name"
        valueField="_id"
        placeholder="Select ingredients"
        search
        searchPlaceholder="Search..."
        value={selected.map((s) => s._id)}
        onChange={handleChange}
      />

      {selected.map((item) => (
        <View key={item._id} style={styles.selectedItem}>
          <Text style={styles.tag}>{item.name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={item.amount}
            onChangeText={(t) => updateAmount(item._id, t)}
          />
        </View>
      ))}
      {selected.length > 0 && (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Ingredients</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default IngredientDropdown;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#4A4A4A",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#E0B3D8",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fce9f5",
    paddingHorizontal: 20,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,

    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tag: {
    backgroundColor: "#FFB0E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#C88CC8",
    fontSize: 15,
    paddingVertical: 4,
    color: "#333",
  },
  button: {
    backgroundColor: "purple",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
