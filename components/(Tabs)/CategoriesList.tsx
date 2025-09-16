import { getAllCategories } from "@/api/category";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import CategoryItem from "../CategoryItem";

interface Category {
  _id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

const CategoriesList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data);
      } catch (err) {
        console.log("error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat._id}
          onPress={() => setSelectedCategory(cat._id)}
          // style={
          //   selectedCategory === cat._id ? styles.circleChosen : styles.circle
          // }
        >
          <CategoryItem
            key={cat._id}
            name={cat.name}
            color={cat.color}
            icon={cat.icon}
            onPress={() => console.log("selected", cat.name)}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 15,
  },
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
    borderColor: "purple",
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
});
