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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 15,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 14,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 14,
    paddingVertical: 2,
  },
  button: {
    backgroundColor: "purple",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
