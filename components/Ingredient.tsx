import { createIngredient } from "@/api/ingredient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  names: string;
}

interface SelectedIngredient extends Ingredient {
  amount: string;
}

const IngredientDropdown = ({
  ingredients,
  onChange,
}: {
  ingredients: Ingredient[];
  onChange: (selected: SelectedIngredient[]) => void;
}) => {
  const [selected, setSelected] = useState<SelectedIngredient[]>([]);
  const [newIngredientName, setNewIngredientName] = useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      setNewIngredientName("");
    },
    onError: (err: any) => {
      console.log("Error creating ingredient:", err);
    },
  });

  const handleChange = (ids: string[]) => {
    const newSelected = ids.map((id) => {
      const found = selected.find((s) => s._id === id);
      const ingredient = ingredients.find((i) => i._id === id)!;
      return found || { ...ingredient, amount: "" };
    });
    setSelected(newSelected);
    onChange(newSelected);
  };

  const updateAmount = (id: string, value: string) => {
    const updated = selected.map((s) =>
      s._id === id ? { ...s, amount: value } : s
    );
    setSelected(updated);
    onChange(updated);
  };
  const handleSubmit = () => {
    console.log("Ingredients added:", selected);
  };
  return (
    <View>
      {/* createnew ingredient */}

      <Text style={styles.label}>Add New Ingredient</Text>
      <View style={styles.newIngredientBox}>
        <TextInput
          style={styles.input}
          placeholder="Type new ingredient"
          value={newIngredientName}
          onChangeText={setNewIngredientName}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            if (!newIngredientName.trim()) return;
            mutate({ names: newIngredientName.trim() });
          }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* list of ingredient */}
      <Text style={styles.label}>Ingredients</Text>

      <MultiSelect
        style={styles.dropdown}
        data={ingredients}
        labelField="names"
        valueField="_id"
        placeholder="Select ingredients"
        search
        searchPlaceholder="Search..."
        value={selected.map((s) => s._id)}
        onChange={handleChange}
      />

      {selected.map((item) => (
        <View key={item._id} style={styles.selectedItem}>
          <Text style={styles.tag}>{item.names}</Text>
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
  newIngredientBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#C88CC8",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
